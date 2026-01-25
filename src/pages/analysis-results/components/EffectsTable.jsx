import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EffectsTable = ({ effects = [], onEffectClick, onBatchAction }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedEffects, setSelectedEffects] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEffects = [...effects]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string') {
      return aValue?.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  const toggleSelectEffect = (effectId) => {
    setSelectedEffects(prev => 
      prev?.includes(effectId) 
        ? prev?.filter(id => id !== effectId)
        : [...prev, effectId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEffects?.length === effects?.length) {
      setSelectedEffects([]);
    } else {
      setSelectedEffects(effects?.map(e => e?.id));
    }
  };

  const getEffectColor = (type) => {
    const colors = {
      zoom: '#6366F1',
      pan: '#8B5CF6',
      blur: '#F59E0B',
      glow: '#10B981',
      shake: '#EF4444',
      text: '#3B82F6'
    };
    return colors?.[type?.toLowerCase()] || '#94A3B8';
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ChevronsUpDown" size={14} color="var(--color-muted-foreground)" />;
    return <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} color="var(--color-primary)" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {selectedEffects?.length > 0 && (
        <div className="px-4 py-3 bg-primary/10 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {selectedEffects?.length} effect{selectedEffects?.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="BookOpen"
              onClick={() => onBatchAction?.('tutorial', selectedEffects)}
            >
              Generate Tutorials
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              onClick={() => onBatchAction?.('queue', selectedEffects)}
            >
              Add to Queue
            </Button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-custom">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedEffects?.length === effects?.length && effects?.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                />
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Effect Type</span>
                  <SortIcon field="type" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => handleSort('confidence')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Confidence</span>
                  <SortIcon field="confidence" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Timestamp</span>
                  <SortIcon field="timestamp" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => handleSort('duration')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Duration</span>
                  <SortIcon field="duration" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => handleSort('complexity')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Complexity</span>
                  <SortIcon field="complexity" />
                </div>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedEffects?.map((effect) => (
              <tr 
                key={effect?.id}
                className="hover:bg-muted/30 transition-smooth cursor-pointer"
                onClick={() => onEffectClick?.(effect)}
              >
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedEffects?.includes(effect?.id)}
                    onChange={() => toggleSelectEffect(effect?.id)}
                    className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getEffectColor(effect?.type) }}
                    />
                    <span className="text-sm font-medium text-foreground">{effect?.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${effect?.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-foreground whitespace-nowrap">
                      {effect?.confidence}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">
                    {effect?.timestamp}s
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">
                    {effect?.duration}s
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`
                    inline-flex px-2 py-1 rounded-full text-xs font-medium
                    ${effect?.complexity?.toLowerCase() === 'easy' ? 'bg-success/20 text-success' : ''}
                    ${effect?.complexity?.toLowerCase() === 'medium' ? 'bg-warning/20 text-warning' : ''}
                    ${effect?.complexity?.toLowerCase() === 'hard' ? 'bg-error/20 text-error' : ''}
                  `}>
                    {effect?.complexity}
                  </span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Play"
                      onClick={() => onEffectClick?.(effect)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="BookOpen"
                      onClick={() => console.log('Generate tutorial', effect?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EffectsTable;