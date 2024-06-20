const QuillToolbar = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  // ["blockquote", "code-block"],
  // [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ size: ["small", false, "large"] }], // custom dropdown
  // [{ align: ["","center","right","justify"] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  ["clean"], // remove formatting button
];

export default QuillToolbar;
