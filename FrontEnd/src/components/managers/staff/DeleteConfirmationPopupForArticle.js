import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const DeleteConfirmationPopupForArticle = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            title="Xác nhận xóa"
            visible={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Không
                </Button>,
                <Button key="submit" type="primary" onClick={onConfirm}>
                    Có
                </Button>,
            ]}
        >
            <p>Bạn có chắc muốn xóa bài viết này không?</p>
        </Modal>
    );
};

DeleteConfirmationPopupForArticle.propTypes = {
    visible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationPopupForArticle;
