import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      return this.setState({editorState})
    };
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  _onBoldClick() {
    // ?? 不起作用
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  handleKeyCommand(command, editorState) {
    // RichUtils has information about the core key commands available to web editors,
    // such as Cmd+B (bold), Cmd+I (italic), and so on.
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

export default MyEditor
