export const userRequest = ( base, ...vars ) => {
  let variable = prompt( `Please enter ${vars[0]}` )
  console.log( base, variable )
  let loc = window.location
  loc.replace( `${loc.origin}/${base}/${variable}` )
  console.log( window.location )
}
