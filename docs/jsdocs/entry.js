
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  
      import _CustomWrapper from '../docs-helpers/component.js';

      window._CustomWrapper = _CustomWrapper;

      import Component0 from '../../src/App.js';
reactComponents['App'] = Component0;

import Component1 from '../../src/components/CdmWordList/CdmWordList.js';
reactComponents['CdmWordList'] = Component1;

import Component2 from '../../src/components/Footer/Footer.js';
reactComponents['Footer'] = Component2;

import Component3 from '../../src/components/Header/Header.js';
reactComponents['Header'] = Component3;

import Component4 from '../../src/components/LoadDataModal/LoadDataModal.js';
reactComponents['LoadDataModal'] = Component4;

import Component5 from '../../src/components/TextArea/TextArea.js';
reactComponents['TextArea'] = Component5;