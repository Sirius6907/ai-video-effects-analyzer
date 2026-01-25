import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TutorialExportOptions = ({ tutorialTitle, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeVideos, setIncludeVideos] = useState(true);
  const [includeParameters, setIncludeParameters] = useState(true);
  const [includeTips, setIncludeTips] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Printable guide with images' },
    { value: 'video', label: 'Video File', description: 'MP4 with narration' },
    { value: 'html', label: 'Interactive Web', description: 'HTML with embedded media' },
    { value: 'json', label: 'JSON Data', description: 'Structured data export' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport({
        format: exportFormat,
        options: {
          includeVideos,
          includeParameters,
          includeTips
        }
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'video': return 'Video';
      case 'html': return 'Globe';
      case 'json': return 'FileCode';
      default: return 'File';
    }
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex items-center gap-2">
        <Icon name="Download" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Export Tutorial
        </h3>
      </div>
      <div className="space-y-4">
        <Select
          label="Export Format"
          description="Choose how you want to save this tutorial"
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
        />

        <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground">
            Include in Export
          </h4>
          
          <Checkbox
            label="Video Demonstrations"
            description="Include before/after comparison videos"
            checked={includeVideos}
            onChange={(e) => setIncludeVideos(e?.target?.checked)}
          />

          <Checkbox
            label="After Effects Parameters"
            description="Include all effect settings and values"
            checked={includeParameters}
            onChange={(e) => setIncludeParameters(e?.target?.checked)}
          />

          <Checkbox
            label="Pro Tips & Tricks"
            description="Include additional learning tips"
            checked={includeTips}
            onChange={(e) => setIncludeTips(e?.target?.checked)}
          />
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <Icon name="Info" size={18} color="var(--color-primary)" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Export Preview
              </h4>
              <p className="text-xs text-muted-foreground">
                {tutorialTitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name={getFormatIcon(exportFormat)} size={14} />
              <span>Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="FileCheck" size={14} />
              <span>Size: ~{exportFormat === 'video' ? '45' : '2.5'} MB</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="default"
            size="default"
            iconName="Download"
            iconPosition="left"
            loading={isExporting}
            onClick={handleExport}
            fullWidth
          >
            {isExporting ? 'Exporting...' : 'Export Tutorial'}
          </Button>
          <Button
            variant="outline"
            size="default"
            iconName="Share2"
            iconPosition="left"
            onClick={() => console.log('Share tutorial')}
            fullWidth
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorialExportOptions;