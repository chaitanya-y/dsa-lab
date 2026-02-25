import { useState } from 'react';



import Tabs from './Tabs';

 function App() {
  return (
    <div className="wrapper">
      <Tabs
        items={[
          {
            value: 'html',
            label: 'HTML',
            panel:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            label: 'CSS',
            panel:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            label: 'JavaScript',
            panel:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          },
        ]}
        defaultValue="css"
      />
    </div>
  );
}

function Tabs({ defaultValue, items }) {
  const [value, setValue] = useState(
    defaultValue ?? items[0].value,
  );

  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({ label, value: itemValue }) => {
          const isActiveValue = itemValue === value;

          return (
            <button
              key={itemValue}
              type="button"
              className={[
                'tabs-list-item',
                isActiveValue && 'tabs-list-item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setValue(itemValue);
              }}>
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ panel, value: itemValue }) => (
          <div key={itemValue} hidden={itemValue !== value}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}




// body {
//   font-family: sans-serif;
// }

// .wrapper {
//   align-items: center;
//   display: flex;
// }

// .tabs {
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// }

// .tabs-list {
//   display: flex;
//   gap: 6px;
// }

// .tabs-list-item {
//   --active-color: blueviolet;

//   background: none;
//   border: 1px solid #000;
//   border-radius: 4px;
//   cursor: pointer;
//   padding: 6px 10px;
// }

// .tabs-list-item:hover {
//   border-color: var(--active-color);
//   color: var(--active-color);
// }

// .tabs-list-item--active,
// .tabs-list-item--active:hover {
//   border-color: var(--active-color);
//   background-color: var(--active-color);
//   color: #fff;
// }
