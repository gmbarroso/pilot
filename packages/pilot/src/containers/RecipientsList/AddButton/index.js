import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'former-kit'

import AddIcon from 'emblematic-icons/svg/Add32.svg'
import style from '../style.css'

const AddButton = props => (
  <div className={style.marginRight}>
    <Button
      type="button"
      icon={<AddIcon width={16} height={16} />}
      fill="outline"
      {...props}
    >
      {props.t('pages.add_recipient.add')}
    </Button>
  </div>
)

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default AddButton
