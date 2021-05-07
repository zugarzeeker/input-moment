import '../src/less/input-moment.less';
import './app.less';
import moment from 'moment';
import qs from 'qs';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import Modal from 'react-modal';
import ReactLoading from 'react-loading';

const customStyles = {
    content: {
        top: '32%',
        left: '49%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#app');

const getInitialState = () => {
    const { initial, minDate, maxDate, mode } = qs.parse(window.location.search.replace('?', ''))
    return {
        m: moment(+initial),
        minDate: moment(+minDate),
        maxDate: moment(+maxDate),
        mode
    }
}
class App extends Component {
    state = {
        ...getInitialState(),
        modalIsOpen: false
    };
    getFormatDate() {
        if (this.state.mode === 'datetime') {
            return 'llll'
        }
        return 'ddd, ll'
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }
    afterOpenModal() { }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleChange = m => {
        this.setState({ m });
    };
    handleSave = () => {
        const picked_date = this.state.m.format('llll');
        console.log('saved', picked_date);
        const data = {
            date_picked: picked_date
        };
        this.openModal();
        window.submit(data);
    };

    render() {
        return (
            <div className="app">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <div>
                        <ReactLoading type={'spinningBubbles'} color="#1385e5" height={'10vh'} width={'10vh'} />
                    </div>
                </Modal>
                <form>
                    <div className="input">
                        <input type="text" value={this.state.m.format(this.getFormatDate())} readOnly />
                    </div>
                    <InputMoment
                        moment={this.state.m}
                        onChange={this.handleChange}
                        minStep={5}
                        onSave={this.handleSave}
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        mode={this.state.mode}
                    >
                    </InputMoment>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
