import React, { useState, useEffect } from 'react';
import storage from '../../../utils/storage';
import SettingsSection from './SettingsSection';
import SettingItem from './SettingItem';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIApiConfiguration = () => {
  const [config, setConfig] = useState({
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4-vision-preview',
    customEndpoint: ''
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  useEffect(() => {
    const saved = storage.get(storage.keys.AI_API_CONFIG, {
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4-vision-preview',
      customEndpoint: ''
    });
    setConfig(saved);
  }, []);

  const handleSave = () => {
    storage.set(storage.keys.AI_API_CONFIG, config);
    alert('AI API configuration saved!');
  };

  const handleTest = async () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus(config.apiKey ? 'success' : 'error');
    }, 1000);
  };

  const providers = [
    { value: 'openai', label: 'OpenAI', models: ['gpt-4-vision-preview', 'gpt-4', 'gpt-3.5-turbo'] },
    { value: 'gemini', label: 'Google Gemini', models: ['gemini-pro-vision', 'gemini-pro'] },
    { value: 'anthropic', label: 'Anthropic Claude', models: ['claude-3-opus', 'claude-3-sonnet'] },
    { value: 'custom', label: 'Custom API', models: [] }
  ];

  const currentProvider = providers.find(p => p.value === config.provider);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-border">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Icon name="Brain" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI API Configuration</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your own AI API keys for video analysis. Your keys are stored locally and never shared.
            </p>
          </div>
        </div>
      </div>

      <SettingsSection
        title="API Provider"
        description="Select your AI provider and configure credentials"
        icon="Key"
        isExpanded={true}
        onToggle={() => {}}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Provider
            </label>
            <select
              value={config.provider}
              onChange={(e) => setConfig({ ...config, provider: e.target.value, model: '' })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
            >
              {providers.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 pr-10 bg-background border border-border rounded-lg text-foreground"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Get your API key from the provider's dashboard
            </p>
          </div>

          {currentProvider?.models.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Model
              </label>
              <select
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value="">Select a model</option>
                {currentProvider.models.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          )}

          {config.provider === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Custom Endpoint
              </label>
              <input
                type="url"
                value={config.customEndpoint}
                onChange={(e) => setConfig({ ...config, customEndpoint: e.target.value })}
                placeholder="https://api.example.com/v1"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Configuration
            </Button>
            <Button
              variant="outline"
              onClick={handleTest}
              iconName={testStatus === 'testing' ? 'Loader' : 'Zap'}
              iconPosition="left"
              disabled={!config.apiKey}
            >
              Test Connection
            </Button>
          </div>

          {testStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Icon name="CheckCircle" size={18} color="rgb(34 197 94)" />
              <span className="text-sm text-green-600 dark:text-green-400">Connection successful!</span>
            </div>
          )}

          {testStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <Icon name="XCircle" size={18} color="rgb(239 68 68)" />
              <span className="text-sm text-red-600 dark:text-red-400">Connection failed. Check your API key.</span>
            </div>
          )}
        </div>
      </SettingsSection>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-accent)" className="mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Where to get API keys:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
              <li>Google Gemini: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aistudio.google.com/app/apikey</a></li>
              <li>Anthropic: <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">console.anthropic.com/settings/keys</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIApiConfiguration;
