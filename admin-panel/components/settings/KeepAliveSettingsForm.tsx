"use client";

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

// UI Components
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/inputs/form";
import { Badge } from "@/components/ui/data-display/badge";

// Context
import { useKeepAlive } from "@/contexts/keep-alive-context";

// Constants
const MIN_INTERVAL = 1; // minimum interval (minutes)
const MAX_INTERVAL = 60; // maximum interval (minutes)

// Schema
const keepAliveFormSchema = z.object({
  interval: z
    .number()
    .min(1, "Interval must be at least 1 minute")
    .max(60, "Interval must be at most 60 minutes"),
});

export default function KeepAliveSettingsForm() {
  const {
    status,
    isStarting,
    isStopping,
    isUpdating,
    localPollingInterval,
    setLocalPollingInterval,
    startService,
    stopService,
    updateInterval,
  } = useKeepAlive();

  const form = useForm<z.infer<typeof keepAliveFormSchema>>({
    resolver: zodResolver(keepAliveFormSchema),
    defaultValues: {
      interval: status?.config?.intervalMinutes || 10,
    },
  });

  // use useEffect to handle form value updates, avoid calling setState during rendering
  useEffect(() => {
    if (status?.config?.intervalMinutes && form.getValues('interval') !== status.config.intervalMinutes) {
      form.setValue('interval', status.config.intervalMinutes);
    }
  }, [status?.config?.intervalMinutes, form]);

  // start service
  const handleStartService = () => startService();

  // stop service
  const handleStopService = () => stopService();

  // update interval
  const handleSubmit = (values: z.infer<typeof keepAliveFormSchema>) => updateInterval(values.interval);

  // get status from context
  const isServiceRunning = status?.isRunning || false;
  const isServerLiving = status?.isLiving || false;
  const lastPingResult = status?.lastPingResult;
  const nextRun = status?.nextRun;
  const targetUrl = status?.config?.targetUrl || "https://your-backend-url.com";

  // get status display text
  const getStatusText = () => {
    if (isServiceRunning) {
      return isServerLiving ? 'Running & Alive' : 'Running but Sleeping';
    }
    return isServerLiving ? 'Server Alive' : 'Stopped';
  };

  // get status color
  const getStatusColor = () => {
    if (isServiceRunning) {
      return isServerLiving ? 'bg-green-500' : 'bg-yellow-500';
    }
    return isServerLiving ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keep Alive Service</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* status display area */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                <span className="text-sm font-medium">
                  {getStatusText()}
                </span>
              </div>
              <div className="space-y-1">
                {lastPingResult && (
                  <p className="text-sm text-gray-500">
                    Last ping: {format(new Date(lastPingResult.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                    {` (Status: ${lastPingResult.status}, Duration: ${lastPingResult.duration}ms)`}
                  </p>
                )}
                {nextRun && (
                  <p className="text-sm text-gray-500">
                    Next run: {format(new Date(nextRun), 'yyyy-MM-dd HH:mm:ss')}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Target: {targetUrl}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Badge
                variant={
                  isServiceRunning
                    ? isServerLiving
                      ? 'default'
                      : 'secondary'
                    : isServerLiving
                    ? 'default'
                    : 'destructive'
                }
              >
                {isServiceRunning
                  ? isServerLiving
                    ? 'Service Active'
                    : 'Server Sleeping'
                  : isServerLiving
                  ? 'Server Alive'
                  : 'Service Inactive'}
              </Badge>
            </div>
          </div>

          {/* control buttons */}
          <div className="flex space-x-4">
            <Button
              type="button"
              onClick={handleStartService}
              disabled={isStarting || isStopping || isServiceRunning}
              className="flex-1"
            >
              {isStarting ? 'Starting...' : 'Start Service'}
            </Button>
            <Button
              type="button"
              onClick={handleStopService}
              disabled={isStarting || isStopping || !isServiceRunning}
              variant="outline"
              className="flex-1"
            >
              {isStopping ? 'Stopping...' : 'Stop Service'}
            </Button>
          </div>

          {/* interval configuration form */}
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
                        min={MIN_INTERVAL}
                        max={MAX_INTERVAL}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the interval between ping requests ({MIN_INTERVAL}-{MAX_INTERVAL} minutes)
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update Interval'}
              </Button>
            </form>
          </Form>

          {/* local polling interval settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Local Status Check Interval</h3>
              <p className="text-sm text-gray-500">
                Set how often the frontend checks the keep-alive status (local setting)
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="polling-interval" className="block text-sm font-medium mb-2">
                  Status Check Interval (minutes)
                </label>
                <Input
                  id="polling-interval"
                  type="number"
                  min={1}
                  max={60}
                  value={localPollingInterval}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1 && value <= 60) {
                      setLocalPollingInterval(value);
                    }
                  }}
                />
              </div>
              <div className="text-sm text-gray-500">
                Range: 1-60 minutes
              </div>
            </div>
            <p className="text-xs text-gray-400">
              This setting controls how often the frontend polls for keep-alive status updates.
              It's stored locally and doesn't affect the backend service.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 