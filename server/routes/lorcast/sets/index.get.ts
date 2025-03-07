export default defineEventHandler((event) => {
  const {lorcastURL} = useAppConfig();
  const endpoint = lorcastURL + '/sets';

  return {
    endpoint
  }
})
