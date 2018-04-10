import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  FormInput,
  Grid,
  Row,
  Col,
  CardActions,
  CardContent,
} from 'former-kit'
import {
  isEmpty,
  equals,
} from 'ramda'
import styles from './style.css'

const required = t => value => (value ? false : t('settings.user.card.access.fieldRequired'))
const areStringsEqual = t => str1 => str2 => (equals(str1, str2) ? false : t('settings.user.card.access.passwordEqual'))

class PasswordRedefinitionForm extends Component {
  constructor (props) {
    super(props)

    const initalFormData = {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    }

    this.state = {
      initalFormData,
      currentFormData: initalFormData,
    }

    this.handleCancellation = this.handleCancellation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormChange (data) {
    this.setState({
      currentFormData: data,
    })
  }

  handleCancellation () {
    this.setState({
      currentFormData: this.state.initalFormData,
    })
  }

  handleFormSubmit (data, formErrors) {
    if (isEmpty(formErrors)) {
      this.props.onSubmit(data)
    }
  }
  render () {
    const {
      t,
    } = this.props

    const {
      currentFormData: {
        new_password,
      },
    } = this.state

    return (
      <Form
        data={this.state.currentFormData}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
        customErrorProp="error"
        validation={
          {
            current_password: required(t),
            new_password: [required(t)],
            new_password_confirmation: [
              required(t),
              areStringsEqual(t)(new_password),
            ],
          }
        }
      >
        <CardContent>
          <Grid>
            <Row>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('settings.user.card.access.currentPassword')}
                  name="current_password"
                  type="password"
                  className={styles.formInput}
                />
              </Col>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('settings.user.card.access.newPassword')}
                  name="new_password"
                  type="password"
                  className={styles.formInput}
                />
              </Col>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('settings.user.card.access.matchNewPassword')}
                  name="new_password_confirmation"
                  type="password"
                  className={styles.formInput}
                />
              </Col>
            </Row>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            type="reset"
            fill="outline"
            size="tiny"
            onClick={this.handleCancellation}
          >
            {t('settings.user.card.access.buttonCancel')}
          </Button>
          <Button
            type="submit"
            size="tiny"
            fill="gradient"
          >
            {t('settings.user.card.access.buttonSubmit')}
          </Button>
        </CardActions>
      </Form>
    )
  }
}

PasswordRedefinitionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
}

PasswordRedefinitionForm.defaultProps = {
  t: t => t,
}

export default PasswordRedefinitionForm