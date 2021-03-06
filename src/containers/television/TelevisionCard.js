import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteTelevision,
  editTelevision,
  updateTelevision,
  hideTelevision,
  flagTelevision,
  removeImage
} from '../../actions/television';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import Television from '../../components/television/Television';
import TelevisionEdit from '../../components/television/TelevisionEdit';

class TelevisionCard extends Component {
  state = {
    ...this.props.television,
    editDate: moment(this.props.television.date),
    focus: false
  };

  handleChange = (e, { name, value }) => {
    if (name === 'rating' || value.length < 256) {
      this.setState({
        [name]: value
      });
    }
  };

  handleSettings = (e, val) => {
    switch (val.value) {
      case 'Edit':
        this.edit();
        return;
      case 'Hide':
        this.hide();
        return;
      case 'Delete':
        this.delete();
        return;
      case 'Flag':
        this.flag();
        return;
      case 'Incorrect Image':
        this.removeImage();
        return;
      default:
        return;
    }
  };

  delete = () => {
    deleteTelevision(this.state.id)
      .then(result => {
        this.props.dispatch(result);
        toastr.error('Deleted.', `Removed ${this.state.title} from your television list.`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  hide = () => {
    this.props.dispatch(hideTelevision(this.state.id));
  };

  edit = () => {
    this.setState({
      ...this.props.television
    });
    this.props.dispatch(editTelevision(this.state.id));
  };

  removeImage = () => {
    this.props.dispatch(removeImage(this.state));
  };

  saveEdit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }

    const token = this.props.state.user.token;
    const editObj = {
      ...this.state,
      token
    };
    editObj.date = this.state.editDate;

    updateTelevision(editObj)
      .then(result => {
        this.props.dispatch(result);
        toastr.info('Successful Update', `Updated ${this.state.title}.`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  validateForm = television => {
    if (!television.title || !television.date || !television.season) {
      toastr.error('Invalid Television', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  flag = () => {
    flagTelevision(this.state.id)
      .then(result => {
        this.props.dispatch(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDateChange = value => {
    this.setState({
      editDate: value,
      focus: false
    });
  };

  toggleFocus = focused => {
    this.setState({
      focus: focused
    });
  };

  disableFutureDays = day => moment().diff(day) < 0;

  render() {
    const { television } = this.props;
    if (!television.edit) {
      return (
        <Television
          television={television}
          user={this.props.state.user}
          handleSettings={this.handleSettings}
        />
      );
    } else {
      return (
        <TelevisionEdit
          television={this.state}
          saveEdit={this.saveEdit}
          cancelEdit={this.edit}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          toggleFocus={this.toggleFocus}
          disableFutureDays={this.disableFutureDays}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(TelevisionCard);
