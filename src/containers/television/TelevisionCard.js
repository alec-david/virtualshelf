import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteTelevision,
  editTelevision,
  updateTelevision,
  hideTelevision,
  flagTelevision
} from '../../actions/television';
import { toastr } from 'react-redux-toastr';

import Television from '../../components/television/Television';
import TelevisionEdit from '../../components/television/TelevisionEdit';

class TelevisionCard extends Component {
  state = {
    ...this.props.television
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
      default:
        console.log('Uh oh');
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

  saveEdit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }

    const token = this.props.state.user.token;
    const editObj = {
      ...this.state,
      token
    };

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
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(TelevisionCard);
