const { getModuleByDisplayName, React } = require('powercord/webpack')
const { AsyncComponent } = require('powercord/components')

const Alert = AsyncComponent.from(getModuleByDisplayName('Alert'))
const TextArea = require('./TextArea')

module.exports = class NoteModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      notes: '',
      error: ''
    }

    console.log(props)

    if (props && props.notes) {
      this.state = {
        notes: props.notes,
        error: props.error
      }
    }
  }

  render () {
    return (
      <Alert
        body={
          <div>
            <TextArea
              rows={15}
              error={this.state.error}
              value={this.state.notes}
              onChange={v => this.setState({ notes: v })}
              placeholder='Notes...'
            />
          </div>
        }
        confirmText={'Close'}
        title={'Notes'}
        onConfirm={() => {
          this.props.onConfirm(this.state.notes)
        }}
      />
    )
  }
}
