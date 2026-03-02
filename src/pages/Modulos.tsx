import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import MenuSuperior from '@/components/MenuSuperior';
import NewFooter from '@/components/NewFooter';
import PageLayout from '@/components/layout/PageLayout';
import { useApiPanels } from '@/hooks/useApiPanels';
import { useApiModules } from '@/hooks/useApiModules';
import ModuleCardTemplates from '@/components/configuracoes/personalization/ModuleCardTemplates';
import ModuleGridWrapper from '@/components/configuracoes/personalization/ModuleGridWrapper';
import EmptyState from '@/components/ui/empty-state';
import * as Icons from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Modulos = () => {
  const { panels, isLoading: panelsLoading } = useApiPanels();
  const { modules, isLoading: modulesLoading } = useApiModules();
  const isMobile = useIsMobile();

  const activePanels = Array.isArray(panels) ? panels.filter(p => p.is_active) : [];

  const getIconComponent = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent || Package;
  };

  const getPanelModules = (panelId: number) => {
    return modules.filter(m => m.panel_id === panelId && m.is_active && m.operational_status === 'on');
  };

  const getPanelTemplate = (panelId: number) => {
    const validTemplates = ['corporate', 'creative', 'minimal', 'modern', 'elegant', 'forest', 'rose', 'cosmic', 'neon', 'sunset', 'arctic', 'volcano', 'matrix'];
    const panel = activePanels.find(p => p.id === panelId);
    if (panel?.template && validTemplates.includes(panel.template)) {
      return panel.template as any;
    }
    return 'modern' as const;
  };

  const isLoading = panelsLoading || modulesLoading;

  return (
    <PageLayout variant="auth" backgroundOpacity="strong" showGradients={false} className="flex flex-col">
      <MenuSuperior />
      <main className="w-full overflow-x-hidden">
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Módulos Disponíveis</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Confira todos os módulos disponíveis na plataforma
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : activePanels.length === 0 ? (
              <EmptyState
                icon={Package}
                title="Nenhum painel ativo"
                description="Nenhum módulo disponível no momento."
              />
            ) : (
              <div className="space-y-8">
                {activePanels.map((panel) => {
                  const PanelIcon = getIconComponent(panel.icon);
                  const panelModules = getPanelModules(panel.id);
                  const template = getPanelTemplate(panel.id);

                  if (panelModules.length === 0) return null;

                  return (
                    <div key={panel.id} className="bg-white/75 dark:bg-gray-800/75 rounded-lg border border-gray-200/75 dark:border-gray-700/75 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                            <PanelIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <CardTitle className={isMobile ? 'text-base' : ''}>{panel.name}</CardTitle>
                          <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                            {panelModules.length}
                          </div>
                        </div>
                      </CardHeader>

                      <ModuleGridWrapper className={isMobile ? 'py-1 px-2 pb-3' : 'p-6 pt-0 pb-4'}>
                        {panelModules.map((module) => (
                          <div key={module.id} className={isMobile ? 'mb-0' : ''}>
                            <ModuleCardTemplates
                              module={{
                                title: module.title,
                                description: module.description,
                                price: '',
                                status: 'ativo',
                                operationalStatus: module.operational_status === 'maintenance' ? 'manutencao' : module.operational_status,
                                iconSize: 'medium',
                                showDescription: true,
                                icon: module.icon,
                                color: module.color,
                              }}
                              template={template}
                            />
                          </div>
                        ))}
                      </ModuleGridWrapper>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <NewFooter />
    </PageLayout>
  );
};

export default Modulos;
