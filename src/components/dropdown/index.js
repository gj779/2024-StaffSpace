import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {appStyles, fontFamily, sizes} from '../../services';
import {colors} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {RegularText} from '../text';
import {ComponentWrapper, RowWrapperBasic} from '../wrappers';
import {totalSize, width} from 'react-native-dimension';
import {IconWithText} from '../icons';
import {Spacer} from '../spacers';

export const Dropdown = props => {
  const {data, icon, placeholder, onSelect, onFocus} = props;
  const {rowTextForSelection, buttonTextAfterSelection} = props;

  return (
    <View style={styles.container}>
      <RowWrapperBasic>
        <Icon
          name={icon ? icon : 'globe'}
          size={sizes.icons.medium}
          color={colors.appTextColor5}
          style={{margin: sizes.smallMargin}}
        />
        <RegularText style={appStyles.textGray}>
          {placeholder || 'Country'}
        </RegularText>
      </RowWrapperBasic>

      <View style={{flexDirection: 'row'}}>
        <SelectDropdown
          onFocus={onFocus}
          search={true}
          defaultButtonText={placeholder ? placeholder : 'Select country'}
          searchPlaceHolder={'Search...'}
          data={data || []}
          onSelect={(selectedItem, index) => {
            if (onSelect) {
              onSelect(selectedItem, index);
            }
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            if (buttonTextAfterSelection) {
              return buttonTextAfterSelection(selectedItem, index);
            } else {
              return selectedItem?.name;
            }
          }}
          rowTextForSelection={(item, index) => {
            if (rowTextForSelection) {
              return rowTextForSelection(item, index);
            } else {
              return item?.name;
            }
          }}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
          rowTextStyle={styles.rowTextStyle}
        />
        <Icon
          name={'chevron-down'}
          size={sizes.icons.medium}
          color={colors.appTextColor5}
          style={{marginRight: 30}}
        />
      </View>
    </View>
  );
};

export const CommonDropdown = props => {
  const {data, error, placeholder, onSelect, onFocus} = props;
  const {rowTextForSelection, buttonTextAfterSelection} = props;
  const {buttonTextStyle, buttonStyle, iconStyle} = props;
  return (
    <View>
      <View style={[styles.container, buttonStyle]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SelectDropdown
            onFocus={onFocus}
            search={true}
            defaultButtonText={placeholder ? placeholder : 'Select country'}
            searchPlaceHolder={'Search...'}
            data={data || []}
            onSelect={(selectedItem, index) => {
              if (onSelect) {
                onSelect(selectedItem, index);
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              if (buttonTextAfterSelection) {
                return buttonTextAfterSelection(selectedItem, index);
              } else {
                return selectedItem?.name;
              }
            }}
            rowTextForSelection={(item, index) => {
              if (rowTextForSelection) {
                return rowTextForSelection(item, index);
              } else {
                return item?.name;
              }
            }}
            buttonStyle={[styles.buttonStyle]}
            buttonTextStyle={[
              styles.buttonTextStyle,
              {textAlign: 'left'},
              buttonTextStyle,
            ]}
            rowTextStyle={styles.rowTextStyle}
            selectedRowStyle={{backgroundColor: colors.primary}}
          />
          <Icon
            name={'chevron-down'}
            size={sizes.icons.medium}
            color={colors.greyOutline}
            style={[{marginRight: 30, alignSelf: 'center'}, iconStyle]}
          />
        </View>
      </View>
      {error ? (
        <ComponentWrapper style={{marginLeft: width(5)}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            text={error}
            tintColor={colors.error}
            iconSize={sizes.icons.small}
            textStyle={[{fontSize: 12}]}
          />
        </ComponentWrapper>
      ) : null}
    </View>
  );
};

export const FilterDropdown = props => {
  const {data, placeholder, onSelect, onFocus} = props;
  const {rowTextForSelection, buttonTextAfterSelection} = props;
  const {buttonTextStyle, buttonStyle, iconStyle} = props;
  return (
    <View
      style={[
        buttonStyle,
        appStyles.center,
        appStyles.shadow,
        {
          backgroundColor: 'white',
          borderRadius: sizes.buttonMiniRadius,
          height: totalSize(5),
          width: totalSize(18.5),
        },
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <SelectDropdown
          onFocus={onFocus}
          search={true}
          defaultButtonText={placeholder ? placeholder : 'Select country'}
          searchPlaceHolder={'Search...'}
          data={data || []}
          onSelect={(selectedItem, index) => {
            if (onSelect) {
              onSelect(selectedItem, index);
            }
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            if (buttonTextAfterSelection) {
              return buttonTextAfterSelection(selectedItem, index);
            } else {
              return selectedItem?.name;
            }
          }}
          rowTextForSelection={(item, index) => {
            if (rowTextForSelection) {
              return rowTextForSelection(item, index);
            } else {
              return item?.name;
            }
          }}
          buttonStyle={[styles.buttonStyle]}
          buttonTextStyle={[
            styles.buttonTextStyle,
            {textAlign: 'left'},
            buttonTextStyle,
          ]}
          rowTextStyle={styles.rowTextStyle}
          selectedRowStyle={{backgroundColor: colors.primary}}
        />
        <Icon
          name={'chevron-down'}
          size={sizes.icons.medium}
          color={colors.greyOutline}
          style={[{marginRight: 5, alignSelf: 'center'}, iconStyle]}
        />
      </View>
    </View>
  );
};

export const SimpleDropdown = props => {
  const {data, icon, placeholder, onSelect, onFocus, buttonStyle} = props;
  const {rowTextForSelection, buttonTextAfterSelection} = props;
  return (
    <SelectDropdown
      onFocus={onFocus}
      search={true}
      defaultButtonText={placeholder ? placeholder : 'Select country'}
      searchPlaceHolder={'Search...'}
      data={data || []}
      onSelect={(selectedItem, index) => {
        if (onSelect) {
          onSelect(selectedItem, index);
        }
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        if (buttonTextAfterSelection) {
          return buttonTextAfterSelection(selectedItem, index);
        } else {
          return selectedItem?.name;
        }
      }}
      rowTextForSelection={(item, index) => {
        if (rowTextForSelection) {
          return rowTextForSelection(item, index);
        } else {
          return item?.name;
        }
      }}
      buttonStyle={[
        styles.container,
        {borderColor: colors.greyOutline},
        buttonStyle,
      ]}
      buttonTextStyle={styles.buttonTextStyle}
      rowTextStyle={styles.rowTextStyle}
      selectedRowStyle={{backgroundColor: colors.primary}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes.inputRadius,
    borderWidth: 1,
    borderColor: colors.greyOutline,
    marginHorizontal: sizes.marginHorizontal,
    backgroundColor: 'white',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderRadius: sizes.inputRadius,
    flex: 1,
  },
  buttonTextStyle: {
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextLight,
    fontSize: totalSize(1.75),
  },
  rowTextStyle: {
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextLight,
    fontSize: totalSize(1.75),
  },
});
