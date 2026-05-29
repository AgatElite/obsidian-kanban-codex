import { EditorView } from '@codemirror/view';
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'preact/compat';
import useOnclickOutside from 'react-cool-onclickoutside';
import { t } from 'src/lang/helpers';
import { parseLaneTitle } from 'src/parsers/helpers/parser';

import { MarkdownEditor, allowNewLine } from '../Editor/MarkdownEditor';
import { KanbanContext } from '../context';
import { c, generateInstanceId } from '../helpers';
import { LaneTemplate } from '../types';

interface LaneFormProps {
  onNewLane: () => void;
  closeLaneForm: () => void;
}

export function LaneForm({ onNewLane, closeLaneForm }: LaneFormProps) {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [archiveOnCheck, setArchiveOnCheck] = useState(false);
  const editorRef = useRef<EditorView>();
  const inputRef = useRef<HTMLTextAreaElement>();
  const clickOutsideRef = useOnclickOutside(() => closeLaneForm(), {
    ignoreClass: [c('ignore-click-outside'), 'mobile-toolbar', 'suggestion-container'],
  });

  const { boardModifiers, stateManager } = useContext(KanbanContext);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createLane = useCallback(
    (cm: EditorView, title: string) => {
      boardModifiers.addLane({
        ...LaneTemplate,
        id: generateInstanceId(),
        children: [],
        data: {
          ...parseLaneTitle(title),
          archiveOnCheck,
          showCheckboxes,
        },
      });

      cm.dispatch({
        changes: {
          from: 0,
          to: cm.state.doc.length,
          insert: '',
        },
      });

      setArchiveOnCheck(false);
      setShowCheckboxes(false);
      onNewLane();
    },
    [
      archiveOnCheck,
      onNewLane,
      setArchiveOnCheck,
      setShowCheckboxes,
      showCheckboxes,
      boardModifiers,
    ]
  );

  const editState = useMemo(() => ({ x: 0, y: 0 }), []);
  const onEnter = useCallback(
    (cm: EditorView, mod: boolean, shift: boolean) => {
      if (!allowNewLine(stateManager, mod, shift)) {
        createLane(cm, cm.state.doc.toString());
        return true;
      }
    },
    [createLane]
  );
  const onSubmit = useCallback(
    (cm: EditorView) => createLane(cm, cm.state.doc.toString()),
    [createLane]
  );

  return (
    <div ref={clickOutsideRef} className={c('lane-form-wrapper')}>
      <div className={c('lane-input-wrapper')}>
        <MarkdownEditor
          className={c('lane-input')}
          editorRef={editorRef}
          editState={editState}
          onEnter={onEnter}
          onEscape={closeLaneForm}
          onSubmit={onSubmit}
        />
      </div>
      <div className={c('checkbox-wrapper')}>
        <div className={c('checkbox-label')}>{t('Show card checkboxes')}</div>
        <div
          onClick={() => setShowCheckboxes(!showCheckboxes)}
          className={`checkbox-container ${showCheckboxes ? 'is-enabled' : ''}`}
        />
      </div>
      <div className={c('checkbox-wrapper')}>
        <div className={c('checkbox-label')}>{t('Archive checked cards')}</div>
        <div
          onClick={() => setArchiveOnCheck(!archiveOnCheck)}
          className={`checkbox-container ${archiveOnCheck ? 'is-enabled' : ''}`}
        />
      </div>
      <div className={c('lane-input-actions')}>
        <button
          className={c('lane-action-add')}
          onClick={() => {
            if (editorRef.current) {
              createLane(editorRef.current, editorRef.current.state.doc.toString());
            }
          }}
        >
          {t('Add list')}
        </button>
        <button className={c('lane-action-cancel')} onClick={closeLaneForm}>
          {t('Done')}
        </button>
      </div>
    </div>
  );
}
