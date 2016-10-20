'use strict';

import React from 'react';

export default class Form extends React.Component {

  handleInput(el) {
    el.preventDefault();
    let inputs = {
      urls: (() => {
        let tmpurl = document
          .getElementById('target_urls')
          .value
          .split(';')
          .map(url => url.trim());
        if (tmpurl[0] != '') {
          return tmpurl;
        } else {
          return undefined;
        }
      })(),
      text: document
        .getElementById('target_text')
        .value
        .trim(),
      checked: this.getCheckedId()
    };
    if (inputs.urls == undefined && inputs.text == '' && inputs.checked != 0) {
      this
        .props
        .displayError('At least one valid url or text should be provided.');
    } else if (inputs.urls == undefined && inputs.text == '' && inputs.checked == 0) {
      this
        .props
        .displayError('At least one valid url/text and analysis should be provided. ');
    } else if (inputs.checked == 0) {
      this
        .props
        .displayError('At least one valid analysis should be provided. ');
    } else {
      this
        .props
        .setButtonState(true, false);

      this
        .props
        .changeInputs(inputs);
    }
  }
  componentDidUpdate() {
    $('#toggle').click(() => {
      $('#myform').slideToggle();
    });
  }
  checkAll() {
    let allInputs = document.querySelectorAll('#checkboxes input');
    allInputs.map = Array.prototype.forEach;
    let checked_box = allInputs
      .forEach(input => input.checked = true);
  }
  clearAll() {
    let allInputs = document.querySelectorAll('#checkboxes input');
    allInputs.map = Array.prototype.forEach;
    let checked_box = allInputs
      .forEach(input => input.checked = false);
  }

  getCheckedId() {
    let allInputs = document.querySelectorAll('#checkboxes input');
    allInputs.map = Array.prototype.map;
    allInputs.filter = Array.prototype.filter;
    let checked_box = allInputs
      .filter(input => input.checked === true)
      .map(input => input.getAttribute('id'));
    return checked_box;
  }

  getActionStatus() {
    if (this.props.buttonState.submitting == false && this.props.buttonState.alreadyGetResult == false) {
      return (

        <div className='row section container'>
          <button
            className='btn waves-effect waves-light light-green darken-1'
            onClick={this
              .checkAll
              .bind(this)}
            id='checkall'>Check All
              <i className='material-icons right'>send</i>
          </button>
          <span>  </span>
          <button
            className='btn waves-effect waves-light  red lighten-2'
            onClick={this
              .clearAll
              .bind(this)}
            id='clear'>Clear
              <i className='material-icons right'>send</i>
          </button>
          <span>  </span>
          <button
            className='btn waves-effect waves-light'
            onClick={this
              .handleInput
              .bind(this)}
            id='submit'>Submit
              <i className='material-icons right'>send</i>
          </button>
        </div>


      );
    } else if (this.props.buttonState.submitting == true) {
      return (
        <div className='row section' id='loading-circle'>
          <div className='preloader-wrapper middle active'>
            <div className='spinner-layer spinner-blue'>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div>
              <div className='gap-patch'>
                <div className='circle'></div>
              </div>
              <div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
            <div className='spinner-layer spinner-red'>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div>
              <div className='gap-patch'>
                <div className='circle'></div>
              </div>
              <div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
            <div className='spinner-layer spinner-yellow'>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div>
              <div className='gap-patch'>
                <div className='circle'></div>
              </div>
              <div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
            <div className='spinner-layer spinner-green'>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div>
              <div className='gap-patch'>
                <div className='circle'></div>
              </div>
              <div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.buttonState.submitting == false && this.props.buttonState.alreadyGetResult == true) {
      return (
        <div className='row section' id='toggle'>
          <div className='col s12 center-align'>
            <button className='btn-large waves-effect waves-light' name='reset'>Toggle
              <i className='material-icons right'>swap_vert</i>
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div id='form' className='center-align'>
        <form className='col s12 section container' id='myform'>
          <div
            className='row'
            style={{
              fontSize: '1.5em',
              fontWeight: '300'
            }}>You can give us some urls here:</div>
          <div className='row'>
            <div className='input-field col s12'>
              <i className='material-icons prefix'>account_circle</i>
              <input
                placeholder='Paste url here'
                id='target_urls'
                type='text'
                className='validate' />
            </div>
          </div>
          <div
            className='row'
            style={{
              fontSize: '1.5em',
              fontWeight: '300'
            }}>Or any text you like:</div>
          <div className='row'>
            <div className='input-field col s12'>
              <i className='material-icons prefix'>mode_edit</i>
              <textarea id='target_text' className='materialize-textarea'></textarea>
              <label htmlFor='target_text'>Paste text here</label>
            </div>
          </div>
          <div
            className='row'
            style={{
              fontSize: '1.5em',
              fontWeight: '300'
            }}>Check the analysis you want:</div>
          <div className='row' id='checkboxes'>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='authors' />
                  <label htmlFor='authors'>Authors</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='concepts' />
                  <label htmlFor='concepts'>Concepts</label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='dates' />
                  <label htmlFor='dates'>Dates</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='doc-emotion' />
                  <label htmlFor='doc-emotion'>Emotion Analysis</label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='entities' />
                  <label htmlFor='entities'>Entities</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='feeds' />
                  <label htmlFor='feeds'>Feeds</label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='doc-sentiment' />
                  <label htmlFor='doc-sentiment'>Sentiment</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='Text-Extraction' />
                  <label htmlFor='Text-Extraction'>Text Extraction
                  </label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='keywords' />
                  <label htmlFor='keywords'>Keywords</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='Language' />
                  <label htmlFor='Language'>Language</label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='Microformats' />
                  <label htmlFor='Microformats'>Microformats</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='pub-date' />
                  <label htmlFor='pub-date'>Publication Date</label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='relations' />
                  <label htmlFor='relations'>Relations</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='typed-rels' />
                  <label htmlFor='typed-rels'>Typed Relations
                  </label>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col m3'></div>
              <div className='col s4'>
                <p>
                  <input type='checkbox' id='taxonomy' />
                  <label htmlFor='taxonomy'>Taxonomy</label>
                </p>
              </div>
              <div className='col s5'>
                <p>
                  <input type='checkbox' id='title' />
                  <label htmlFor='title'>Title Extraction</label>
                </p>
              </div>
            </div>
          </div>

        </form>
        {this.getActionStatus()}
      </div>

    );
  }
}
