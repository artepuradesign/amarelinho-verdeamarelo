import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MenuSuperior from '@/components/MenuSuperior';
import NewFooter from '@/components/NewFooter';
import PageLayout from '@/components/layout/PageLayout';
import { useApiPanels } from '@/hooks/useApiPanels';
import { useApiModules } from '@/hooks/useApiModules';

const Modulos = () => {
  const { panels } = useApiPanels();
  const { modules } = useApiModules();
  const [search, setSearch] = useState('');
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);

  const activePanels = panels.filter(p => p.is_active);
  const activeModules = modules.filter(m => m.is_active);

  const filtered = useMemo(() => {
    let list = activeModules;
    if (selectedPanel) list = list.filter(m => m.panel_id === selectedPanel);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        (m.title || m.name || '').toLowerCase().includes(q) ||
        (m.description || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeModules, selectedPanel, search]);

  const formatPrice = (price?: number) => {
    if (!price || price === 0) return 'Grátis';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <PageLayout variant="auth" backgroundOpacity="strong" showGradients={false} className="flex flex-col">
      <MenuSuperior />
      <main className="w-full overflow-x-hidden">
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Módulos Disponíveis</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Confira todos os módulos da plataforma
              </p>
            </motion.div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar módulo..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedPanel === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPanel(null)}
                >
                  Todos
                </Button>
                {activePanels.map(p => (
                  <Button
                    key={p.id}
                    variant={selectedPanel === p.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPanel(p.id)}
                  >
                    {p.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((mod, i) => {
                const panel = activePanels.find(p => p.id === mod.panel_id);
                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{mod.title || mod.name}</h3>
                          {panel && (
                            <span className="text-[10px] text-muted-foreground">{panel.name}</span>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={mod.operational_status === 'on' ? 'default' : 'secondary'}
                        className="text-[10px]"
                      >
                        {mod.operational_status === 'on' ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{mod.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">{formatPrice(mod.price)}</span>
                      {mod.is_premium && (
                        <Badge variant="outline" className="text-[10px]">Premium</Badge>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum módulo encontrado</p>
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
