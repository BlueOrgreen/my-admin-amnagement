const map = {
  dev: {
    baseURL: 'https://service-cdp-1.dev.heytea.com',
    baseUpmsURL: 'https://api-upms-1.dev.heytea.com',
    baseCommonURL: 'https://dev-go-1-base-gateway.heyteago.com',
    baseSsoURL: 'https://cas-go-1.dev.heytea.com/logout',
  },
  test: {
    baseURL: 'https://service-cdp-1.test.heytea.com',
    baseUpmsURL: 'https://api-upms-1.test.heytea.com',
    baseCommonURL: 'https://test-go-1-api.heyteago.com',
    baseSsoURL: 'https://test-go-1-cas.heyteago.com/logout',
  },
  stg: {
    baseURL: 'https://service-cdp-1.stg.heytea.com',
    baseUpmsURL: 'https://api-upms-1.stg.heytea.com',
    baseCommonURL: 'https://staging.heytea.com',
    baseSsoURL: 'https://staging1-cas.heyteago.com/logout',
  },
  prod: {
    baseURL: 'https://service-cdp-1.lan.heytea.com',
    baseUpmsURL: 'https://api-upms.lan.heytea.com',
    baseCommonURL: 'https://go.heytea.com',
    baseSsoURL: 'https://account.heytea.com/logout',
  },
}

export const { baseURL, baseUpmsURL, baseCommonURL, baseSsoURL } =
  map[process.env.REACT_APP_API_ENV as keyof typeof map] || map['dev']
