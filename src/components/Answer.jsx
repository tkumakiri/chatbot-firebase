import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }))

const Answer = (props) => {
  //   const classes = useStyles();
  return (
    <div>
      <Button variant="contained" color="primary">
        {props.content}
      </Button>
    </div>
  )
}

export default Answer
