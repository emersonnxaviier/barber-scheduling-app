
export const initialState = {
    avatar: '',
    favorites: [],
    appointments: [],
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar }; // pega as informações(o estado) da pagina inicial, e altera o avatar.
            break;

        default:
            return state;
            break;
    }
}