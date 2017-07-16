import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field, change as changeForm, formValueSelector} from 'redux-form';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import _RInput from '../RTextInput';
import Button from '../Button';
import CloseIcon from '../svg-icons/close';
import {updateCollection, createCollection} from '../../actions/collection';
import {media} from '../../style/util';
import {errorColor} from '../../style/colors';

const Wrapper = styled.div `
  position: relative;
  padding: 25px;
  width: 510px;
  ${media.tablet `
      width: 100%;
      height: 100%;
    `}
`;

const Title = styled.h1 `
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CloseBtn = styled.button `
  margin: 4px 8px;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 16px;
`;

const Form = styled.form ``;

const RInput = styled(_RInput)`
  margin-bottom: 10px;
`;

const Controller = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;
  margin-bottom: 6px;
`;

const CheckboxCon = Controller.extend `
  flex-direction: row;
  align-items: center;  
  margin-top: 10px;
`;

const ConHeader = styled.div `
  font-size: 14px;
  font-weight: 600;
  padding: 4px 2px;
`;

const Actions = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 6px;
`;

const CancelBtn = styled.div `
  text-decoration: underline;
  font-size: 14.5px;
  cursor: pointer;
`;

const DeleteBtn = CancelBtn.extend `
  color: ${errorColor};
`;

const PrivateBtn = styled.button `
  user-select: none;
  margin-left: 12px;
`;

const Note = styled.div `
  display: flex;
  width: 160px;
  justify-content: space-between;
`;

const nameReq = value => (value
  ? void 0
  : 'please enter name');

let MainForm = ({
  handleSubmit,
  submitting,
  pristine,
  editMode,
  onRequestClose,
  onChangeForm,
  isPrivate,
  collectionId
}) => (
  <Form onSubmit={handleSubmit}>
    <Controller>
      <ConHeader>
        Title
      </ConHeader>
      <Field
        name="title"
        label="Title"
        component={RInput}
        type="text"
        fullWidth
        validate={[nameReq]} 
      />
    </Controller>
    <Controller>
      <ConHeader>
        Description
      </ConHeader>
      <Field
        name="description"
        label="Description"
        component={RInput}
        type="text"
        rows="4"
        fullWidth
        multiLine 
      />
      <CheckboxCon>
        <Field name="private" component="input" type="checkbox" />
        <PrivateBtn
          type="button"
          onClick={() => onChangeForm('add_or_edit_collection', 'private', !isPrivate)}
        >Make collection private</PrivateBtn>
      </CheckboxCon>
    </Controller>
    <Actions>
      {editMode
        ? <DeleteBtn>Delete Collection</DeleteBtn>
        : <CancelBtn onClick={e => onRequestClose(e)}>Cancel</CancelBtn>}
      <Button
        disabled={pristine || submitting}
        type="submit"
        primary
        label={editMode
        ? 'Save'
        : 'Create Collection'} 
      />
    </Actions>
  </Form>
);

MainForm = reduxForm({form: 'add_or_edit_collection', enableReinitialize: true})(MainForm);

class AddOrEditCollection extends Component {

  render() {
    const {
      className,
      editMode,
      collectionId,
      onRequestClose,
      onChangeForm,
      isPrivate,
      initialValues,
      onCreateCollection,
      onUpdateCollection
    } = this.props;

    return (
      <Wrapper className={className}>
        <CloseBtn onClick={e => onRequestClose(e)}>
          <CloseIcon />
        </CloseBtn>
        <Title>{editMode
            ? 'Edit collection'
            : 'Create new collection'}</Title>
        <MainForm
          onChangeForm={onChangeForm}
          editMode={editMode}
          onRequestClose={onRequestClose}
          isPrivate={isPrivate}
          initialValues={initialValues}
          collectionId={collectionId}
          onSubmit={values => editMode
          ? onUpdateCollection(collectionId, values)
          : onCreateCollection(values)} 
        />
      </Wrapper>
    );
  }
}

AddOrEditCollection.propTypes = {
  className: PropTypes.string,
  editMode: PropTypes.bool,
  collectionId: PropTypes.number,
  isPrivate: PropTypes.bool,
  initialValues: PropTypes.object,
  onRequestClose: PropTypes.func,
  onUpdateCollection: PropTypes.func,
  onCreateCollection: PropTypes.func,
  onChangeForm: PropTypes.func
};

/**
 * NOTE: since we use wrap component with connect the Route and also use NavLink inside 'Nav Component' the Route and NavLink dosn't connected
 * and when route changed the NavLink don't rerender
 * so we use Wrap component with withRouter
 * MORE_INFO: https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
 */
const selector = formValueSelector('add_or_edit_collection');
const mapStateToProps = (state, props) => {
  const searchParams = new URLSearchParams(state.router.location.search);
  const editMode = props.match.params.id && !searchParams.has('step');
  const collection = editMode
    ? state.items.user_collections[props.match.params.id]
    : void 0;
  return {
    collectionId: collection
      ? collection.id
      : void 0,
    initialValues: collection
      ? {
        title: collection.title,
        description: collection.description,
        private: collection.private
      }
      : {},
    isPrivate: selector(state, 'private'),
    editMode
  };
};
export default withRouter(connect(mapStateToProps, dispatch => bindActionCreators({
  onUpdateCollection: updateCollection,
  onCreateCollection: createCollection,
  onChangeForm: changeForm
}, dispatch))(AddOrEditCollection));