import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';

let {RepositoryBase} = proxyquire('./RepositoryBase', {
    'mongoose': {
        Types: {
            ObjectId: {
                createFromHexString: (hexString: any) => {
                    return hexString;
                }
            }
        }
    }
});

describe('RepositoryBase', () => {
    let schemaModel: any;
    let queryMetaData: any = {
        page: 3,
        limit: 2
    }

    let execStub: any;
    let skipStub: any;
    let limitStub: any;

    let item: any;
    let error: any;
    let result: any;

    beforeEach(() => {
        item = {
            uuid: '1234'
        }
        error = sinon.spy();
        result = sinon.spy();
        
        schemaModel = {
            create: sinon.stub(),
            find: sinon.stub(),
            update: sinon.stub(),
            remove: sinon.stub(),
            findOne: sinon.stub(),
            findById: sinon.stub()
        };

        execStub = {
            exec: sinon.stub()
        }

        limitStub = {
            limit: sinon.stub()
        }

        limitStub
            .limit
            .withArgs(queryMetaData.limit)
            .returns(execStub);

        skipStub = {
            skip: sinon.stub()
        }
        
        skipStub
            .skip
            .withArgs(queryMetaData.page * queryMetaData.limit)
            .returns(limitStub);

        schemaModel.find
            .withArgs(item)
            .returns(skipStub)

        schemaModel.find
            .withArgs({})
            .returns(skipStub)
    });

    describe('create', () => {
        it('should call the create method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.create(item);
            expect(schemaModel.create.getCall(0).args[0]).toBe(item);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.create(item)
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.create.callArgWith(1, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.create(item)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.create.callArgWith(1, error, null);
        });
    });

    describe('update', () => {
        it('should call the update method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.update(item);
            expect(schemaModel.update.getCall(0).args[0]).toEqual(item);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.update(item)
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.update.callArgWith(2, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.update(item)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.update.callArgWith(2, error, null);
        });
    });

    describe('delete', () => {
        it('should call the remove method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.delete(item);
            expect(schemaModel.remove.getCall(0).args[0]).toEqual(item);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.delete(item)
                .then(() => {
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.remove.callArgWith(1, null);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.delete(item)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.remove.callArgWith(1, error);
        });
    });

    describe('findAll', () => {
        it('should call the correct methods of the given model', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findAll(queryMetaData);
            expect(schemaModel.find.callCount).toBe(1);
            expect(skipStub.skip.callCount).toBe(1);
            expect(limitStub.limit.callCount).toBe(1);
            expect(execStub.exec.callCount).toBe(1);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findAll(queryMetaData)
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            execStub.exec.callArgWith(0, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findAll(queryMetaData)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            execStub.exec.callArgWith(0, error, null);
        });
    });

    describe('findBy', () => {
        it('should call the correct methods of the given model', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findBy(item, queryMetaData);
            expect(schemaModel.find.callCount).toBe(1);
            expect(skipStub.skip.callCount).toBe(1);
            expect(limitStub.limit.callCount).toBe(1);
            expect(execStub.exec.callCount).toBe(1);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findBy(item, queryMetaData)
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            execStub.exec.callArgWith(0, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findBy(item, queryMetaData)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            execStub.exec.callArgWith(0, error, null);
        });
    });

    describe('findByEmail', () => {
        let email = 'abcd';

        it('should call the findByEmail method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findByEmail(email);
            expect(schemaModel.findOne.getCall(0).args[0]).toEqual({
                email: "abcd"
            });
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findByEmail(email)
                .then((data: any) => {
                    expect(data).toEqual(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.findOne.callArgWith(1, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findByEmail(email)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.findOne.callArgWith(1, error, null);
        });
    });

    describe('findById', () => {
        let id = 'abcd';

        it('should call the findById method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findById(id);
            expect(schemaModel.findById.getCall(0).args[0]).toEqual(id);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findById(id)
                .then((data: any) => {
                    expect(data).toEqual(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.findById.callArgWith(1, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findById(id)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.findById.callArgWith(1, error, null);
        });
    });
});
