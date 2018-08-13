import React from 'react';
import {Modal,FormGroup,Checkbox} from 'react-bootstrap';
import { connect } from 'react-redux';
import {toggleSound,toggleNotification,changeDelay} from '../actions/settingsActions';
import {closeSettingsModal} from '../actions/utilActions';
class settingsModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      permission : Notification.permission
    }
  }
  render() {
    const {delay,sound,notification} = this.props.settings;
    return (
      <div>
        <Modal show={this.props.showModal} onHide={()=> this.handleCloseSettingsModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Checkbox checked={sound} onChange={() => this.handleToggleSound()}>
                Toggle Sound
              </Checkbox>
              {' '}
              {
                window.Notification ? <Checkbox checked={notification} onChange={() => this.handleToggleNotification()} disabled={this.state.permission === 'denied'}>
                    Toggle Notifications
                  </Checkbox> : ''
              }
              {' '}
              {"Delay "}<input type="number" value={delay} onChange={e => this.handleChangeDelay(e)} min={5}/>{" s"}
            </FormGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  handleCloseSettingsModal(){
    const {dispatch} = this.props;
    dispatch(closeSettingsModal());
  }
  handleToggleSound(){
    const {dispatch} = this.props;
    dispatch(toggleSound());
  }
  handleToggleNotification(){
    const {dispatch} = this.props;
    Notification.requestPermission().then(result =>{
      if(result === 'granted') dispatch(toggleNotification())
    }).then(() => this.setState({permission : Notification.permission}));
  }
  handleChangeDelay(e){
    e.preventDefault();
    const {dispatch} = this.props;
    const n = Number.parseInt(e.target.value,0);
    if(n < 5 || !Number.isInteger(n)) return;
    dispatch(changeDelay(n));
  }
}
const mapStateToProps = (state) => ({
  settings: state.settings,
  showModal: state.utils.settingsModalOpen
})
const SettingsModal = connect(mapStateToProps)(settingsModal);
export default SettingsModal;
