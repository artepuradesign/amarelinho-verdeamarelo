
import React from 'react';
import TextLogo from '@/components/TextLogo';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const LoginHeader: React.FC = () => {
  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      <div className="mb-6 flex justify-center">
        <div className="flex items-center gap-3">
          <Package className="text-brand-purple dark:text-purple-400 animate-logo-3d" size={48} />
          <span className="text-3xl font-bold text-brand-purple dark:text-purple-400">API</span>
          <span className="text-3xl font-bold text-foreground">Painel</span>
        </div>
      </div>
    </>
  );
};

export default LoginHeader;
