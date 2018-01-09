import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field, change as changeForm, formValueSelector} from 'redux-form';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import _RInput from '../../components/RTextInput';
import Button from '../../components/Button';
import CloseIcon from '../../components/svg-icons/close';
import {updateCollection, deleteCollection, createCollection} from '../../actions/collection';
import {setActionData} from '../../actions/app';
import {CONFIRM_DELETE_COLLECTION} from '../../constants/action-types';
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

let MainForm = ({
  handleSubmit,
  submitting,
  pristine,
  editMode,
  onRequestClose,
  onChangeForm,
  isPrivate,
  onSetActionData,
  confirmDeleteAction,
  onDeleteCollection,
  collectionId
}) => (
  <Form onSubmit={handleSubmit}>
    <Controller>
      <ConHeader>
        Title
      </ConHeader>
      <Field name="title" label="Title" component={RInput} type="text" fullWidth />
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
        ? confirmDeleteAction
          ? <Note>Are you sure ?
            <CancelBtn
                onClick={() => onSetActionData(CONFIRM_DELETE_COLLECTION.toLowerCase(), false)}
              >Cancel</CancelBtn>
          </Note>
          : <DeleteBtn
            onClick={() => onSetActionData(CONFIRM_DELETE_COLLECTION.toLowerCase(), true)}
          >Delete Collection</DeleteBtn>
        : <CancelBtn onClick={e => onRequestClose(e)}>Cancel</CancelBtn>}
      {confirmDeleteAction
        ? <Button
          primary
          label="Delete"
          primaryColor={errorColor}
          onClick={() => onDeleteCollection(collectionId)}
          type="button" 
        />
        : <Button
          disabled={pristine || submitting}
          type="submit"
          primary
          label={editMode
          ? 'Save'
          : 'Create Collection'} 
        />}
    </Actions>
  </Form>
);

MainForm = reduxForm({form: 'add_or_edit_collection', enableReinitialize: true})(MainForm);

class AddOrEditCollection extends Component {
  componentDidMount() {
    this
      .props
      .onSetActionData(CONFIRM_DELETE_COLLECTION.toLowerCase());
  }

  render() {
    const {
      className,
      editMode,
      collectionId,
      onRequestClose,
      onChangeForm,
      isPrivate,
      initialValues,
      confirmDeleteAction,
      onCreateCollection,
      onUpdateCollection,
      onDeleteCollection,
      onSetActionData
    } = this.props;

    return (
      <Wrapper className={className}>
        <Helmet>
          <title>{editMode
              ? 'Edit Collection - unsplash clone'
              : 'Add New Collection - unsplash clone'}</title>
        </Helmet>
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
          onSetActionData={onSetActionData}
          onDeleteCollection={onDeleteCollection}
          isPrivate={isPrivate}
          initialValues={initialValues}
          collectionId={collectionId}
          onSubmit={values => editMode
          ? onUpdateCollection(collectionId, values)
          : onCreateCollection(values)}
          confirmDeleteAction={confirmDeleteAction} 
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
  onDeleteCollection: PropTypes.func,
  onCreateCollection: PropTypes.func,
  onSetActionData: PropTypes.func,
  onChangeForm: PropTypes.func
};

AddOrEditCollection.defaultProps = {
  confirmDeleteAction: false
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
    ? state.items.userCollections[props.match.params.id]
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
    editMode,
    confirmDeleteAction: state.app.actionData[CONFIRM_DELETE_COLLECTION.toLowerCase()]
  };
};
export default withRouter(connect(mapStateToProps, dispatch => bindActionCreators({
  onUpdateCollection: updateCollection,
  onDeleteCollection: deleteCollection,
  onCreateCollection: createCollection,
  onChangeForm: changeForm,
  onSetActionData: setActionData
}, dispatch))(AddOrEditCollection));