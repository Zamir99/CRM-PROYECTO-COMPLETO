import { NavigationItem } from '../../../@vex/interfaces/navigation-item.interface';

export const NAVIGATION_ITEMS_ADMIN: NavigationItem[] = [
  
  
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

  {
    type: 'subheading',
    label: 'Módulo Financiero',
    children: [
      {
        type: 'dropdown',
        label: 'Pagos Alumnos',
        icon: 'mat:account_balance',
        children: [
          {
            type: 'link',
            label: 'Crear Tipos',
            route: '/apps/help-center/getting-started'
          },
          {
            type: 'link',
            label: 'Crear ',
            route: '/apps/help-center/pricing'
          },
          {
            type: 'link',
            label: 'Valores',
            route: '/apps/help-center/faq'
          },
          {
            type: 'link',
            label: 'Guides',
            route: '/apps/help-center/guides'
          }
        ]
      },
      {
        type: 'dropdown',
        label: 'Pagos Caes',
        icon: 'mat:monetization_on',
        children: [
          {
            type: 'link',
            label: 'Crear Tipos',
            route: '/apps/help-center/getting-started'
          },
          {
            type: 'link',
            label: 'Crear ',
            route: '/apps/help-center/pricing'
          },
          {
            type: 'link',
            label: 'Valores',
            route: '/apps/help-center/faq'
          },
          {
            type: 'link',
            label: 'Guides',
            route: '/apps/help-center/guides'
          }
        ]
      },
    ]
  },

  {
    type: 'subheading',
    label: 'Publicidad y Marketing',
    children: [
      {
        type: 'link',
        label: 'Configuración',
        route: '/otra',
        icon: 'mat:settings',
      },
      {
        type: 'link',
        label: 'Landing Page',
        route: '/otra',
        icon: 'mat:important_devices',
      },
      {
        type: 'link',
        label: 'Banners y Videos',
        route: '/otra',
        icon: 'mat:featured_video',
      }
    ]
  },
]