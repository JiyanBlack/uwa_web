import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <div className="form z-depth-1">
        <form className="col s12 section container">
          <div className="row" style={{ fontSize: "1.5em", fontWeight: "300" }}>You can give us some urls here: </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input placeholder='Paste urls here, seperate by semicolon' id="target_url" type="text" className="validate" />
            </div>
          </div>
          <div className="row" style={{ fontSize: "1.5em", fontWeight: "300" }}>Or any text you like: </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">mode_edit</i>
              <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
              <label htmlFor="icon_prefix2">Paste texts here</label>
            </div>
          </div>
          <div className="row" style={{ fontSize: "1.5em", fontWeight: "300" }}>Check the analysis you want: </div>
          <div className="row">
            <div className="col s6">
              <p>
                <input type="checkbox" id="Authors" />
                <label htmlFor="Authors">Authors</label>
              </p>
              <p>
                <input type="checkbox" id="Concepts"/>
                <label htmlFor="Concepts">Concepts</label>
              </p>
              <p>
                <input type="checkbox" id="Dates"/>
                <label htmlFor="Dates">Filled in</label>
              </p>
              <p>
                <input type="checkbox" id="Emotion-Analysis" />
                <label htmlFor="Emotion-Analysis">Emotion Analysis</label>
              </p>
              <p>
                <input type="checkbox" id="Entities"/>
                <label htmlFor="Entities">Entities</label>
              </p>
              <p>
                <input type="checkbox" id="Feeds" />
                <label htmlFor="Feeds">Feeds</label>
              </p>
              <p>
                <input type="checkbox" id="Sentiment" />
                <label htmlFor="Sentiment">Sentiment</label>
              </p>
              <p>
                <input type="checkbox" id="Text Extraction " />
                <label htmlFor="Text Extraction ">Text Extraction </label>
              </p>

            </div>
            <div className="col s6">
              <p>
                <input type="checkbox" id="Keywords" />
                <label htmlFor="Keywords">Keywords</label>
              </p>
              <p>
                <input type="checkbox" id="Language"/>
                <label htmlFor="Language">Language</label>
              </p>
              <p>
                <input type="checkbox" id="Microformats"/>
                <label htmlFor="Microformats">Microformats</label>
              </p>
              <p>
                <input type="checkbox" id="Publication-Date" />
                <label htmlFor="Publication-Date">Publication Date</label>
              </p>
              <p>
                <input type="checkbox" id="Relations"/>
                <label htmlFor="Relations">Relations</label>
              </p>
              <p>
                <input type="checkbox" id="Typed-Relations" />
                <label htmlFor="Typed-Relations">Typed Relations </label>
              </p>
              <p>
                <input type="checkbox" id="Taxonomy"/>
                <label htmlFor="Taxonomy">Taxonomy</label>
              </p>
              <p>
                <input type="checkbox" id="Title-Extraction"/>
                <label htmlFor="Title-Extraction">Title Extraction</label>
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="row section">
            <div className="col s12 center-align">
              <button className="btn-large waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}