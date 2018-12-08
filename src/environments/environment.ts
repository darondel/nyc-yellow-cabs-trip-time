import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  layout: {
    smallScreen: 749,
    sidenav: {
      width: 375,
      toggle: {
        color: 'primary'
      }
    }
  },
  data: {
    input: {
      grid: {
        rowHeight: 89
      },
      field: {
        appearance: 'outline',
        color: 'primary',
        floatLabel: 'always'
      },
      passengerVolume: {
        min: 1,
        max: 7
      },
      route: {
        step: 0.001,
        icon: {
          origin: 'assets/images/icons/map-dot-blue.png',
          destination: 'assets/images/icons/map-dot-red.png'
        }
      }
    },
    output: {
      spinner: {
        diameter: 75
      }
    },
    submit: {
      color: 'accent'
    }
  },
  map: {
    apiKey: 'INSERT_YOUR_API_KEY_HERE'
  }
};
