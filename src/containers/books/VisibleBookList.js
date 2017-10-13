import { connect } from 'react-redux';
import BookList from '../../components/books/BookList';

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(BookList);
