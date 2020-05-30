export const Constants = Object.freeze({
    /** This field indicates that item was deleted in database. */
    Deleted: 1,
    /** This field indicates that item was modified in database. */
    ModifiedSuccess: 1,
    Response: Object.freeze({
        Success: 0,
        NotLogin: 1,
        RoleError: 2,
        ParamError: 3,
        DataNotExist: 4,
        ConvertError: 5,
        NoRecord: 8,
        Failure: 9
    }),
    DbKeywords: Object.freeze({
        NotEqual: '$ne',
        Set: '$set'
    }),
    Collections: Object.freeze({
        // Common fields
        Common: Object.freeze({
            _ID: '_id',
            ID: 'id',
            Name: 'name',
            DeleteFlag: 'deleteFlag',
            UpdateTime: 'updateTime',
            DeleteTime: 'deleteTime',
            InsertTime: 'insertTime'
        })
    }),
    V2: '/management/v2.1',
    V3: '/intelligent/v3.0'
})
