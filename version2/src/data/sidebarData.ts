export const sidebarItems = [
  {
    id: 'home',
    label: 'Home',
    icon: 'lucide:home',
    href: '/',
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'lucide:layers',
    href: '/components',
    children: [
      {
        id: 'buttons',
        label: 'Buttons',
        href: '/components/buttons',
      },
      {
        id: 'inputs',
        label: 'Inputs',
        href: '/components/inputs',
      },
      {
        id: 'cards',
        label: 'Cards',
        href: '/components/cards',
      },
      {
        id: 'navigation',
        label: 'Navigation',
        href: '/components/navigation',
      },
    ],
  },
  {
    id: 'design-tokens',
    label: 'Design Tokens',
    icon: 'lucide:palette',
    href: '/design-tokens',
    children: [
      {
        id: 'colors',
        label: 'Colors',
        href: '/design-tokens/colors',
      },
      {
        id: 'typography',
        label: 'Typography',
        href: '/design-tokens/typography',
      },
      {
        id: 'spacing',
        label: 'Spacing',
        href: '/design-tokens/spacing',
      },
    ],
  },
  {
    id: 'pattern-library',
    label: 'Pattern Library',
    icon: 'lucide:layout-template',
    href: '/pattern-library',
  },
  {
    id: 'changelog',
    label: 'Changelog',
    icon: 'lucide:history',
    href: '/changelog',
  },
];
