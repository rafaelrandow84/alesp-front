import { Duration } from "luxon";

export default {
  versao: "0.5.4",
  tempo_de_leitura_da_cartilha: Duration.fromObject({ seconds: 10 }),
  api_url: 'https://mobile-api.pub.al.sp.gov.br',
  keycloak_url: 'https://kc.pub.al.sp.gov.br',
};
