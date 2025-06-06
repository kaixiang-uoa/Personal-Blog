'use client';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Controls from './Controls';

/**
 * navbar component
 * combine Logo, desktop menu, mobile menu and control buttons
 * the refactored component structure is clearer, with clear responsibilities, making it easier to maintain
 */
export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3 dark:border-b-gray-800">
      <Logo />
      
      <div className="flex flex-1 justify-end gap-8">
        {/* desktop nav menu */}
        <DesktopNav />
        
        {/* theme toggle and language switcher */}
        <Controls />
        
        {/* mobile nav menu */}
        <MobileNav />
      </div>
    </header>
  );
} 