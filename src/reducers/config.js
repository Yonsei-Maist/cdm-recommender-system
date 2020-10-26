/**
 * set default setting used by application
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05. ~
 * @date 2020.10.23
 */
import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';

const SET = 'config/SET';

export const setConfig = createAction(SET);

const initialState = Map({
	defaultSetting:             null
});

export default handleActions({
	[SET]: (state, action) => {
		const {defaultSetting} = action.payload;
		return state.set('defaultSetting', defaultSetting);
	}
}, initialState)