import update from 'immutability-helper';
import { useContext } from 'preact/compat';
import { Path } from 'src/dnd/types';
import { t } from 'src/lang/helpers';

import { KanbanContext } from '../context';
import { c } from '../helpers';
import { EditState, Lane, isEditing } from '../types';

export interface LaneSettingsProps {
  lane: Lane;
  lanePath: Path;
  editState: EditState;
}

export function LaneSettings({ lane, lanePath, editState }: LaneSettingsProps) {
  const { boardModifiers } = useContext(KanbanContext);

  if (!isEditing(editState)) return null;

  return (
    <div className={c('lane-setting-wrapper')}>
      <div className={c('checkbox-wrapper')}>
        <div className={c('checkbox-label')}>{t('Show card checkboxes')}</div>
        <div
          onClick={() =>
            boardModifiers.updateLane(
              lanePath,
              update(lane, {
                data: { $toggle: ['showCheckboxes'] },
              })
            )
          }
          className={`checkbox-container ${lane.data.showCheckboxes ? 'is-enabled' : ''}`}
        />
      </div>
      <div className={c('checkbox-wrapper')}>
        <div className={c('checkbox-label')}>{t('Archive checked cards')}</div>
        <div
          onClick={() =>
            boardModifiers.updateLane(
              lanePath,
              update(lane, {
                data: { $toggle: ['archiveOnCheck'] },
              })
            )
          }
          className={`checkbox-container ${lane.data.archiveOnCheck ? 'is-enabled' : ''}`}
        />
      </div>
    </div>
  );
}
