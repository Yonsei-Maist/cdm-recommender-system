/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.20
 */

/**
 * @category Actions
 * @module actions/docAction
 * @requires ../action-types
 */
import { createAction } from 'redux-actions';
import DOC from '../action-types/doc';

const getDocListLoading = createAction(DOC.GET_DOC_LIST_LOADING);
const getDocListSuccess = createAction(DOC.GET_DOC_LIST_SUCCESS);
const getDocListError = createAction(DOC.GET_DOC_LIST_ERROR);

export { getDocListLoading, getDocListSuccess, getDocListError };
