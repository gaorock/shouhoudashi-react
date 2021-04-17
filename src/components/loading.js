import { Backdrop, CircularProgress } from '@material-ui/core';

export default function Loading ({open = true}) {
  return (
    <Backdrop className="backdrop" open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}