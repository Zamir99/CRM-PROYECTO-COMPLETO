import { NavigationItem } from '../../../@vex/interfaces/navigation-item.interface';

export const NAVIGATION_ITEMS_COMERCIAL: NavigationItem[] = [
  
  
  {
    type: 'subheading',
    label: 'Módulo Administrativo',
    children: [
      {
        type: 'link',
        label: 'Tareas',
        route: '/pages/scrumboard',
        icon: 'mat:dashboard',
        badge: {
          value: 'NEW',
          bgClass: 'bg-primary',
          textClass: 'text-primary-contrast',
        }
      },
      {
        type: 'dropdown',
        label: 'Caes',
        icon: 'mat:work',
        children: [
          {
            type: 'link',
            label: 'Lista de Caes',
            route: '/apps/help-center/getting-started'
          },
          {
            type: 'link',
            label: 'Balance Pagos',
            route: '/apps/help-center/pricing'
          },
          {
            type: 'link',
            label: 'Multar',
            route: '/apps/help-center/faq'
          },
          {
            type: 'link',
            label: 'Pagos Icfes',
            route: '/apps/help-center/guides'
          }
        ]
      },
      {
        type: 'dropdown',
        label: 'Solicitudes',
        icon: 'mat:local_library',
        children: [
          {
            type: 'link',
            label: 'Constancias y Certificados',
            route: '/apps/help-center/getting-started'
          },
          {
            type: 'link',
            label: 'Modulos',
            route: '/apps/help-center/pricing'
          },
          {
            type: 'link',
            label: 'Togas y Birretes',
            route: '/apps/help-center/faq'
          },
          {
            type: 'link',
            label: 'Duplicados',
            route: '/apps/help-center/guides'
          }
        ]
      },
      {
        type: 'link',
        label: 'Calendaro',
        route: '/apps/calendar',
        icon: 'mat:date_range',
        badge: {
          value: '12',
          bgClass: 'bg-deep-purple',
          textClass: 'text-deep-purple-contrast',
        },
      },
    ]
  },

  {
    type: 'subheading',
    label: 'Módulo Académico',
    children: [
      {
        type: 'dropdown',
        label: 'Notas',
        icon: 'mat:import_contacts',
        children: [
          {
            type: 'link',
            label: 'Reporte notas ',
            route: '/apps/help-center/guides'
          },
          {
            type: 'link',
            label: 'Subir notas',
            route: '/apps/help-center/getting-started'
          },
          {
            type: 'link',
            label: 'Subir notas recuperación ',
            route: '/apps/help-center/pricing'
          },
          {
            type: 'link',
            label: 'Subir notas R. S',
            route: '/apps/help-center/faq'
          }
          
        ]
      },
      {
        type: 'dropdown',
        label: 'Plataforma',
        icon: 'mat:web',
        children: [
          {
            type: 'link',
            label: 'Periodos',
            route: '/apps/help-center/getting-started'
          },
          {
            type: 'link',
            label: 'Grupos ',
            route: '/apps/help-center/pricing'
          },
          {
            type: 'link',
            label: 'Semanas',
            route: '/apps/help-center/faq'
          }
          
        ]
      },
    ]
  },

  
]