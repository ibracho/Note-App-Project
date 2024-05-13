import { useEffect, useState } from 'react';
import { filterBy, toggleShowCompletedNotesOnly } from '../../../redux/reducers/notesReducers';

import { connect } from "react-redux";

import './TabsContainer.scss';
import Tab from '../../atoms/Tab/Tab';
import Icon from '../../atoms/Icon/Icon';
import Button from '../../atoms/Button/Button';

function TabsContainer({ categories, filterBy, toggleShowCompletedNotesOnly }) {
    const tabs = [{ value: '', displayValue: 'All' }, ...categories]
    const [indexSelectedTab, setIndexSelectedTab] = useState(0);

    const [seeCompletedNotesOnly, setSeeCompletedNotesOnly] = useState(false);

    const handleTabClick = (e) => {
        const i = e.target.getAttribute("tab-index");
        const value = e.target.getAttribute('tab-value');
        setIndexSelectedTab(parseInt(i));
        filterBy(value);
    }

    const seeCompletedNotesOnlyHandler = () => setSeeCompletedNotesOnly(!seeCompletedNotesOnly);

    useEffect(() => {
        toggleShowCompletedNotesOnly(seeCompletedNotesOnly);
    }, [seeCompletedNotesOnly, toggleShowCompletedNotesOnly])

    return (
        <div className='filters'>
            <div className='tabs-container'>
                {tabs.map((tab, i) => <Tab key={i} tabIndex={i} {...tab} selected={i === indexSelectedTab} handleTabClick={handleTabClick} />)}
            </div>
            <div className='tabs-container__show-completed'>
                <Button buttonType='icon' icon={seeCompletedNotesOnly ? <Icon name="checkbox-complete" /> : <Icon name="checkbox" />} text="Show only completed notes" clickHandler={seeCompletedNotesOnlyHandler} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        filterBy: (category) => dispatch(filterBy(category)),
        toggleShowCompletedNotesOnly: (seeCompletedNotesOnly) => dispatch(toggleShowCompletedNotesOnly(seeCompletedNotesOnly))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
