import mitt from 'mitt';

export const UPDATE_CATE_ID = 'update_cate_id'

type Events = {
    [UPDATE_CATE_ID]: string;
};

const emitter = mitt<Events>();

export default emitter

