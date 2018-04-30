import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { addTelevision } from '../../actions/television';
import { toastr } from 'react-redux-toastr';
import plusImg from '../../imgs/plus.svg';

import NewTelevision from '../../components/television/NewTelevision';

const imageStyle = {
  cursor: 'pointer'
}

const defaultState = {
  addTelevision: false,
  title: '',
  season: '',
  episode: '',
  description: '',
  date: '',
  rating: 3,
}

class NewTelevisionCard extends Component {

  state = defaultState;

  addNewTelevision = () => {
    this.setState({
      addTelevision: true
    })
  }

  cancel = () => {
    this.setState({
      addTelevision: false
    })
  }

  handleSubmit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }
    const televisionObj = {
      ...this.state,
      email: this.props.state.user.email
    }

    addTelevision(televisionObj).then(result => {
      this.props.dispatch(result);
      toastr.success('Success!', `Added ${this.state.title} to your watched television.`);
      this.setState({
        ...defaultState
      });
    })
  }

  validateForm = (television) => {
    if (!television.title || !television.date) {
      toastr.error('Invalid Television', 'Please fill out all required fields.');
      return false;
    }
    return true;
  }

  handleChange = (e, { name, value }) => {
    if (!value.length || value.length <= 255) {
      this.setState({
        [name]: value
      });
    }
  }

  render() {
    if (!this.state.addTelevision) {
      return (
        <Card>
          <Image
            src={plusImg}
            onClick={this.addNewTelevision}
            style={imageStyle}
          />
          <Card.Content>
            <Card.Header>
              Add a new television show.
            </Card.Header>
          </Card.Content>
        </Card>
      )
    } else {
      return (
        <NewTelevision
          television={this.state}
          cancel={this.cancel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NewTelevisionCard);