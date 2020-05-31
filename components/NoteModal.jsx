const {
  getModuleByDisplayName,
  React,
  getModule,
} = require('powercord/webpack');
const { AsyncComponent } = require('powercord/components');
const { FormTitle } = require('powercord/components');
const { Modal } = require('powercord/components/modal');
const { close: closeModal } = require('powercord/modal');

const TextArea = AsyncComponent.from(getModuleByDisplayName('TextArea'));
const Margin = getModule(['marginBottom20'], false);

module.exports = class NoteModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notes: '',
      error: '',
    };

    if (props) {
      if (props.notes) {
        this.state = {
          notes: props.notes,
        };
      }
      if (props.error) {
        this.state = {
          error: props.error,
        };
      }
    }
  }

  render() {
    return (
      <Modal size={Modal.Sizes.SMALL}>
        <Modal.Header>
          <FormTitle tag='h4'>Notes</FormTitle>
          <Modal.CloseButton onClick={() => closeModal()} />
        </Modal.Header>
        <Modal.Content className={Margin.marginBottom20}>
          <TextArea
            rows={15}
            error={this.state.error}
            value={this.state.notes}
            onChange={(v) => {
              this.setState({ notes: v });
              this.props.save(v);
            }}
            placeholder='Notes...'
          />
        </Modal.Content>
      </Modal>
    );
  }
};
