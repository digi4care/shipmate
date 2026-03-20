export const name = 'shipmate';
export const version = '0.1.0';

export const agents = {
  strategy: './agent/strategy.md',
  architect: './agent/architect.md',
  designer: './agent/designer.md',
  'second-opinion': './agent/second-opinion.md'
};

export const skills = {
  ship: './skill/ship',
  review: './skill/review',
  qa: './skill/qa',
  'qa-quick': './skill/qa-quick',
  retro: './skill/retro',
  browse: './skill/browse',
  'browser-auth': './skill/browser-auth',
  investigate: './skill/investigate',
  'design-audit': './skill/design-audit',
  'design-help': './skill/design-help',
  brainstorm: './skill/brainstorm',
  'release-notes': './skill/release-notes',
  'shipmate-upgrade': './skill/shipmate-upgrade',
  unfreeze: './skill/unfreeze'
};

export const hooks = {
  careful: './hook/careful',
  freeze: './hook/freeze',
  guard: './hook/guard',
  unfreeze: './hook/unfreeze'
};

export const config = {
  dataDir: process.env.SHIPMATE_DATA || '~/.shipmate',
  hookDir: process.env.SHIPMATE_HOOK_DIR || '~/.shipmate/hooks'
};

export function init(options = {}) {
  return {
    name,
    version,
    agents,
    skills,
    hooks,
    config: { ...config, ...options }
  };
}

export default {
  name,
  version,
  agents,
  skills,
  hooks,
  config,
  init
};
