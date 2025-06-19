"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

// UI Components
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { Switch } from "@/components/ui/inputs/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/inputs/form";
import { Badge } from "@/components/ui/data-display/badge";
import { useToast } from "@/hooks/ui/use-toast";

// Services
import { keepAliveService, type KeepAliveConfig } from "@/lib/services/keep-alive-service";

// Types
interface KeepAliveSettingsFormProps {
  defaultValues: KeepAliveConfig;
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  isSaving?: boolean;
}

// Constants
const MIN_INTERVAL = 1; // minimum interval (minutes)
const MAX_INTERVAL = 15; // maximum interval (minutes)
const MINUTES_TO_MS = 60 * 1000; // minutes to milliseconds conversion factor
const DEFAULT_POLLING_INTERVAL = 16; // default polling interval (minutes)

// Schema
const keepAliveFormSchema = z.object({
  interval: z.number().min(MIN_INTERVAL).max(MAX_INTERVAL), // 1-15 minutes (minutes)
  enabled: z.boolean(),
  pollingInterval: z.number().min(1).max(60), // 1-60 minutes
});

export default function KeepAliveSettingsForm({
  defaultValues,
  onSubmit,
  loading = false,
  isSaving = false,
}: KeepAliveSettingsFormProps) {
  const { toast } = useToast();
  const [serviceStatus, setServiceStatus] = useState({
    isRunning: defaultValues.isRunning,
    lastPingTime: null as Date | null,
    lastPingStatus: null as number | null,
    lastPingError: null as string | null,
  });
  const [pingStatus, setPingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pollingInterval, setPollingInterval] = useState(DEFAULT_POLLING_INTERVAL);

  // Convert milliseconds to minutes
  const msToMinutes = (ms: number) => Math.round(ms / MINUTES_TO_MS);
  
  // Convert minutes to milliseconds
  const minutesToMs = (minutes: number) => minutes * MINUTES_TO_MS;

  const form = useForm<z.infer<typeof keepAliveFormSchema>>({
    resolver: zodResolver(keepAliveFormSchema),
    defaultValues: {
      interval: msToMinutes(defaultValues.interval),
      enabled: defaultValues.enabled,
      pollingInterval: DEFAULT_POLLING_INTERVAL,
    },
  });

  // Get service status
  const fetchServiceStatus = async () => {
    try {
      console.log(`[${new Date().toLocaleTimeString()}] Fetching service status...`);
      const response = await keepAliveService.getConfig();
      if (response.success && response.data) {
        setServiceStatus({
          isRunning: response.data.isRunning,
          lastPingTime: response.data.lastPingTime ? new Date(response.data.lastPingTime) : null,
          lastPingStatus: response.data.lastPingStatus,
          lastPingError: response.data.lastPingError,
        });
      }
    } catch (error) {
      console.error("Failed to fetch service status:", error);
    }
  };

  // Start status check interval
  useEffect(() => {
    fetchServiceStatus(); // Initial fetch
    const interval = setInterval(fetchServiceStatus, minutesToMs(pollingInterval));
    return () => clearInterval(interval);
  }, [pollingInterval]); // reset the interval when the polling interval changes


  const handleTestPing = async () => {
    try {
      setPingStatus('loading');
      const response = await keepAliveService.triggerPing();
      console.log("response", response);
      if (!response.success) {
        throw new Error(response.message || 'Ping failed');
      }

      // Update status
      setPingStatus('success');
      setServiceStatus(prev => ({
        ...prev,
        isRunning: true,
        lastPingTime: new Date(),
        lastPingStatus: response.data?.status || 200,
        lastPingError: null,
      }));

      // Show success message
      toast({
        title: "Success",
        description: "Ping successful",
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setPingStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Ping error:', error);
      setPingStatus('error');
      
      // Handle authentication error
      if (error.response?.status === 401) {
        toast({
          title: "Authentication Error",
          description: "Please log in to continue",
          variant: "destructive",
        });
        // Redirect to login page
        window.location.href = '/login';
        return;
      }

      setServiceStatus(prev => ({
        ...prev,
        isRunning: false,
        lastPingError: error instanceof Error ? error.message : 'Ping failed',
      }));
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Ping failed',
        variant: "destructive",
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setPingStatus('idle');
      }, 3000);
    }
  };

  const handleSubmit = async (values: z.infer<typeof keepAliveFormSchema>) => {
    try {
      // Convert minutes to milliseconds
      const valuesInMs = {
        ...values,
        interval: minutesToMs(values.interval),
      };
      await onSubmit(valuesInMs);
      // Update service status
      await fetchServiceStatus();
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  // Determine if service is active
  const isActive = serviceStatus.isRunning;

  // Modify status display text
  const getStatusText = () => {
    if (!serviceStatus.isRunning) return 'Stopped';
    if (serviceStatus.lastPingStatus === 200) return 'Running';
    if (serviceStatus.lastPingError) return 'Error';
    return 'Running'; // 如果isRunning为true但没有ping记录，也显示为Running
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keep Alive Service</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Status Section */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                  {getStatusText()}
                </span>
              </div>
              <div className="space-y-1">
                {serviceStatus.lastPingTime && (
                  <p className="text-sm text-gray-500">
                    Last ping: {format(serviceStatus.lastPingTime, 'yyyy-MM-dd HH:mm:ss')}
                    {serviceStatus.lastPingStatus && ` (Status: ${serviceStatus.lastPingStatus})`}
                    {serviceStatus.lastPingError && ` (Error: ${serviceStatus.lastPingError})`}
                  </p>
                )}
              </div>
            </div>
            <Badge variant={isActive ? "default" : "destructive"}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {/* Form Section */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ping Interval (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? MIN_INTERVAL : Number(e.target.value);
                          field.onChange(Math.max(MIN_INTERVAL, value));
                        }}
                        min={MIN_INTERVAL}
                        max={MAX_INTERVAL}
                        step={1}
                      />
                    </FormControl>
                    <FormDescription>
                      Interval between pings ({MIN_INTERVAL}-{MAX_INTERVAL} minutes)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pollingInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Check Interval (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 1 : Number(e.target.value);
                          const newValue = Math.max(1, Math.min(60, value));
                          field.onChange(newValue);
                          setPollingInterval(newValue);
                        }}
                        min={1}
                        max={60}
                        step={1}
                      />
                    </FormControl>
                    <FormDescription>
                      How often to check service status (1-60 minutes)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Service</FormLabel>
                      <FormDescription>
                        Enable or disable the keep alive service
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestPing}
                  disabled={!form.getValues("enabled") || pingStatus === 'loading'}
                >
                  {pingStatus === 'loading' ? (
                    <>
                      <span className="mr-2">Testing...</span>
                      <span className="animate-spin">⚡</span>
                    </>
                  ) : pingStatus === 'success' ? (
                    <>
                      <span className="mr-2">Test Success</span>
                      <span className="text-green-500">✓</span>
                    </>
                  ) : pingStatus === 'error' ? (
                    <>
                      <span className="mr-2">Test Failed</span>
                      <span className="text-red-500">✕</span>
                    </>
                  ) : (
                    'Test Ping'
                  )}
                </Button>
                <Button type="submit" disabled={loading || isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
} 