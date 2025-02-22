import { useQuasar } from "quasar"

const isMobile = () => {
  const $q = useQuasar()
  return $q.platform.is.mobile
}

export default isMobile;
