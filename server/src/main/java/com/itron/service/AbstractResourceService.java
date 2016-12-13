// package com.itron.service;
//
// import java.io.IOException;
// import java.lang.reflect.ParameterizedType;
// import java.text.MessageFormat;
// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.HashMap;
// import java.util.HashSet;
// import java.util.LinkedHashMap;
// import java.util.LinkedList;
// import java.util.List;
// import java.util.ListIterator;
// import java.util.Map;
// import java.util.Map.Entry;
// import java.util.Set;
//
// import javax.annotation.PostConstruct;
// import javax.persistence.EntityManager;
// import javax.persistence.FlushModeType;
// import javax.servlet.http.HttpServletRequest;
// import javax.validation.ConstraintViolation;
// import javax.validation.Validator;
//
// import org.apache.commons.collections.CollectionUtils;
// import org.apache.commons.lang.StringUtils;
// import org.apache.cxf.helpers.IOUtils;
// import org.apache.log4j.Logger;
// import org.dozer.classmap.ClassMap;
// import org.dozer.fieldmap.FieldMap;
// import org.eclipse.persistence.config.CascadePolicy;
// import org.eclipse.persistence.config.QueryHints;
// import org.eclipse.persistence.internal.sessions.UnitOfWorkImpl;
// import org.eclipse.persistence.sessions.UnitOfWork;
// import org.springframework.beans.factory.annotation.Autowired;
//
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.sap.sbo.bofrw.common.NameUtils;
// import com.sap.sbo.bofrw.common.bo.BusinessObject;
// import com.sap.sbo.bofrw.common.bo.BusinessObjectFacade;
// import com.sap.sbo.bofrw.common.bo.BusinessObjectNode;
// import com.sap.sbo.bofrw.common.bo.annotation.DisableIdempotentCheck;
// import com.sap.sbo.bofrw.common.bo.boql.EntityQLQuery;
// import com.sap.sbo.bofrw.common.bo.query.Constant;
// import com.sap.sbo.bofrw.common.bo.query.Criteria;
// import com.sap.sbo.bofrw.common.bo.query.Operator.Equal;
// import com.sap.sbo.bofrw.common.bo.query.Path;
// import com.sap.sbo.bofrw.common.errorcode.EntityFrwNSErrorCode;
// import com.sap.sbo.bofrw.dos.AuthorizationMgr;
// import com.sap.sbo.bofrw.dos.DosPermission;
// import com.sap.sbo.bofrw.metadata.Association;
// import com.sap.sbo.bofrw.metadata.BusinessObjectType;
// import com.sap.sbo.bofrw.metadata.Node;
// import com.sap.sbo.bofrw.metadata.NodeType;
// import com.sap.sbo.bofrw.metadata.Property;
// import com.sap.sbo.bofrw.ns.bo.NewStackBusinessObject;
// import com.sap.sbo.common.ApplicationContextHolder;
// import com.sap.sbo.common.RequestContextHolder;
// import com.sap.sbo.common.exception.BusinessException;
// import com.sap.sbo.ext.meta.UserProperty;
// import com.sap.sbo.odatafrw.ConfigConstants;
// import com.sap.sbo.odatafrw.constants.ODataConstants;
// import com.sap.sme.occ.api.APIFrwErrorCode;
// import com.sap.sme.occ.api.APIUtils;
// import com.sap.sme.occ.api.dozer.DozerBeanMapper;
// import com.sap.sme.occ.api.dozer.DozerMappingDirection;
// import com.sap.sme.occ.api.dozer.MappingAssistData;
// import com.sap.sme.occ.api.dozer.MappingProcessor;
// import com.sap.sme.occ.api.dozer.MappingProcessorAssistant;
// import com.sap.sme.occ.api.frw.udf.ExtendObject;
// import com.sap.sme.occ.api.frw.udf.FieldMeta;
// import com.sap.sme.occ.api.query.QueryUtils;
// import com.sap.sme.occ.api.validate.ValidationContext;
// import com.sap.sme.occ.api.validate.ValidationContext.ValidationType;
// import com.sap.sme.occ.api.validate.ValidationException;
//
/// **
// *
// * The base class of resource services, providing the capabilities for RO/Entity
// * conversation, generic operations of Entity CRUD, etc.
// *
// * @author I305767
// *
// * @param <RO>
// * @param <Entity>
// */
// public abstract class AbstractResourceService<Entity> {
//
// private static final Logger LOGGER = Logger.getLogger(AbstractResourceService.class);
//
// private static final String KEY_CUSTOM_FIELDS = "customFields";
//
// @Autowired
// protected DozerBeanMapper mapper;
//
// protected Class<Entity> roClass;
//
// protected ClassMap ro2boClassMap;
// protected ClassMap bo2roClassMap;
//
// protected Validator validator;
//
// @PostConstruct
// @SuppressWarnings("unchecked")
// protected void init() {
// // 1. Initialize RO class and Entity class
// roClass = (Class<Entity>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
// boClass = (Class<Entity>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[1];
//
// // 2. Initialize Dozer class map with necessary steps
// MappingProcessor mappingProcessor = (MappingProcessor) mapper.getMappingProcessor();
// ro2boClassMap = mappingProcessor.getClassMap(roClass, boClass, null);
// bo2roClassMap = mappingProcessor.getClassMap(boClass, roClass, null);
//
// // 3. Hibernate validator
// validator = javax.validation.Validation.buildDefaultValidatorFactory().getValidator();
// }
//
// /**
// * @param id
// * @return
// */
// public Entity getEntity(Long id) {
// long begin = System.currentTimeMillis();
//
// Entity bo = boFacade.getEntityRepository(boClass).load(id);
//
// if (PERF_LOGGER.isInfoEnabled()) {
// String message = MessageFormat.format(ConfigConstants.PERM_FORMAT, "", "OpenApi",
// roClass.getSimpleName() + String.valueOf(id), "GET", "", "",
// String.valueOf(System.currentTimeMillis() - begin));
// PERF_LOGGER.info(message);
// }
//
// if (bo == null) {
// LOGGER.info("Can not find Entity {} id {}.", boClass, id);
// throw new BusinessException(APIFrwErrorCode.API_RESOURCE_NOT_FOUND, id);
// }
//
// // check data ownership
// checkDataOwnership(bo, DosPermission.READ);
// return bo;
// }
//
// /**
// * @param filter
// * @return
// */
// public List<Entity> queryEntitys(String filter, String orderBy, Integer limit, Integer offset) {
// return this.queryEntitys(filter, null, orderBy, limit, offset);
// }
//
// /***
// *
// * @param filter
// * @return
// */
// public List<Entity> queryEntitys(String filter, String search, String orderBy, Integer limit, Integer offset) {
// if (RequestContextHolder.getApiUseBoFilter()
// && !"api-gateway".equalsIgnoreCase(RequestContextHolder.getVia())) {
// LOGGER.info("the api query is base on bo filter.");
// return queryEntitysBaseOnEntityFilter(filter, search, orderBy, limit, offset);
// } else {
// return queryEntitysBaseOnROFilter(filter, search, orderBy, limit, offset);
// }
// }
//
// /**
// * @param filter
// * @param search
// * @param orderBy
// * @param limit
// * @param offset
// * @return
// */
// private List<Entity> queryEntitysBaseOnEntityFilter(String filter, String search, String orderBy, Integer limit,
// Integer offset) {
// long begin = System.currentTimeMillis();
//
// Map<String, Object> paramMap = new HashMap<>();
// List<Entity> result = null;
// long recordNum = 0;
// try {
// String queryStmt = QueryUtils.buildEntityQLBaseOnBoFilter(paramMap, boFacade, boClass, filter, search,
// orderBy, false);
// EntityQLQuery<Entity> query = boFacade.createQuery(queryStmt, boClass);
// for (Entry<String, Object> e : paramMap.entrySet()) {
// query.setParameter(e.getKey(), e.getValue());
// }
//
// // Set default value for limit and offset
// if (limit == null) {
// limit = QueryUtils.DEFAULT_PARAM_LIMIT;
// }
// if (limit.intValue() > QueryUtils.DEFAULT_PARAM_LIMIT) {
// throw new BusinessException(APIFrwErrorCode.API_QUERY_EXCEED_LIMIT);
// }
//
// query.setMaxResults(limit);
//
// if (offset == null) {
// offset = QueryUtils.DEFAULT_PARAM_OFFSET;
// }
// query.setFirstResult(offset);
// result = query.getResultList();
// recordNum = result == null ? 0 : result.size();
// return result;
// } catch (BusinessException be) {
// LOGGER.info(
// "Failed to parse or generate EntityQL for filter: {}, orderby: {}, limit: {}, offset: {} due to {}! Check log for
// detail.",
// filter, orderBy, limit, offset, be);
// if (!EntityFrwNSErrorCode.EntityQL_CREATE_QUERY_ERROR.equals(be.getErrorCode())) {
// throw be;
// } else {
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC);
// }
// } catch (Exception e) {
// LOGGER.info(
// "Failed to parse or generate EntityQL for filter: {}, orderby: {}, limit: {}, offset: {} due to {}! Check log for
// detail.",
// filter, orderBy, limit, offset, e);
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC, e);
// } finally {
// if (PERF_LOGGER.isInfoEnabled()) {
// String queryInfo = " filter:" + filter + " records:" + String.valueOf(recordNum);
// String message = MessageFormat.format(ConfigConstants.PERM_FORMAT, "", "OpenApi", queryInfo, "GET",
// "GET", "", String.valueOf(System.currentTimeMillis() - begin));
// PERF_LOGGER.info(message);
// }
// }
// }
//
// /**
// * @param filter
// * @param search
// * @param orderBy
// * @param limit
// * @param offset
// * @return
// */
// private List<Entity> queryEntitysBaseOnROFilter(String filter, String search, String orderBy, Integer limit,
// Integer offset) {
// long begin = System.currentTimeMillis();
//
// MappingProcessor mappingProcessor = (MappingProcessor) mapper.getMappingProcessor();
// Map<String, Object> paramMap = new HashMap<>();
// List<Entity> result = null;
// long recordNum = 0;
// try {
// String queryStmt = QueryUtils.buildEntityQL(paramMap, boFacade, mappingProcessor, roClass, boClass, filter,
// search, orderBy, false);
// EntityQLQuery<Entity> query = boFacade.createQuery(queryStmt, boClass);
// for (Entry<String, Object> e : paramMap.entrySet()) {
// query.setParameter(e.getKey(), e.getValue());
// }
//
// // Set default value for limit and offset
// if (limit == null) {
// limit = QueryUtils.DEFAULT_PARAM_LIMIT;
// }
// if (limit.intValue() > QueryUtils.DEFAULT_PARAM_LIMIT) {
// throw new BusinessException(APIFrwErrorCode.API_QUERY_EXCEED_LIMIT);
// }
//
// query.setMaxResults(limit);
//
// if (offset == null) {
// offset = QueryUtils.DEFAULT_PARAM_OFFSET;
// }
// query.setFirstResult(offset);
// result = query.getResultList();
// recordNum = result == null ? 0 : result.size();
// return result;
// } catch (BusinessException be) {
// LOGGER.info(
// "Failed to parse or generate EntityQL for filter: {}, orderby: {}, limit: {}, offset: {} due to {}! Check log for
// detail.",
// filter, orderBy, limit, offset, be);
// if (!EntityFrwNSErrorCode.EntityQL_CREATE_QUERY_ERROR.equals(be.getErrorCode())) {
// throw be;
// } else {
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC);
// }
// } catch (Exception e) {
// LOGGER.info(
// "Failed to parse or generate EntityQL for filter: {}, orderby: {}, limit: {}, offset: {} due to {}! Check log for
// detail.",
// filter, orderBy, limit, offset, e);
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC, e);
// } finally {
// if (PERF_LOGGER.isInfoEnabled()) {
// String queryInfo = " filter:" + filter + " records:" + String.valueOf(recordNum);
// String message = MessageFormat.format(ConfigConstants.PERM_FORMAT, "", "OpenApi", queryInfo, "GET",
// "GET", "", String.valueOf(System.currentTimeMillis() - begin));
// PERF_LOGGER.info(message);
// }
// }
// }
//
// /**
// * @param filter
// * @return
// */
// public Long countEntitys(String filter) {
// if (RequestContextHolder.getApiUseBoFilter()
// && !"api-gateway".equalsIgnoreCase(RequestContextHolder.getVia())) {
// LOGGER.info("the api count is base on bo filter.");
// return countEntitysBaseOnEntityFilter(filter);
// } else {
// return countEntitysBaseOnROFilter(filter);
// }
// }
//
// /**
// * @param filter
// * @return
// */
// private Long countEntitysBaseOnEntityFilter(String filter) {
// Map<String, Object> paramMap = new HashMap<>();
// try {
// String queryStmt = QueryUtils.buildEntityQLBaseOnBoFilter(paramMap, boFacade, boClass, filter, null, null,
// true);
// EntityQLQuery<Long> query = boFacade.createQuery(queryStmt, Long.class);
// for (Entry<String, Object> e : paramMap.entrySet()) {
// query.setParameter(e.getKey(), e.getValue());
// }
// List<Long> res = query.getResultList();
// return CollectionUtils.isEmpty(res) ? 0 : (Long) res.get(0);
// } catch (BusinessException be) {
// LOGGER.info("Failed to parse or generate EntityQL for filter: {} due to {}! Check log for detail.", filter,
// be);
// if (!EntityFrwNSErrorCode.EntityQL_CREATE_QUERY_ERROR.equals(be.getErrorCode())) {
// throw be;
// } else {
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC);
// }
// } catch (Exception e) {
// LOGGER.info("Failed to parse or generate EntityQL for filter: {} due to {}! Check log for detail.", filter,
// e);
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC, e);
// }
// }
//
// /**
// * @param filter
// * @return
// */
// private Long countEntitysBaseOnROFilter(String filter) {
// MappingProcessor mappingProcessor = (MappingProcessor) mapper.getMappingProcessor();
// Map<String, Object> paramMap = new HashMap<>();
// try {
// String queryStmt = QueryUtils.buildEntityQL(paramMap, boFacade, mappingProcessor, roClass, boClass, filter,
// null, true);
// EntityQLQuery<Long> query = boFacade.createQuery(queryStmt, Long.class);
// for (Entry<String, Object> e : paramMap.entrySet()) {
// query.setParameter(e.getKey(), e.getValue());
// }
// List<Long> res = query.getResultList();
// return CollectionUtils.isEmpty(res) ? 0 : (Long) res.get(0);
// } catch (BusinessException be) {
// LOGGER.info("Failed to parse or generate EntityQL for filter: {} due to {}! Check log for detail.", filter,
// be);
// if (!EntityFrwNSErrorCode.EntityQL_CREATE_QUERY_ERROR.equals(be.getErrorCode())) {
// throw be;
// } else {
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC);
// }
// } catch (Exception e) {
// LOGGER.info("Failed to parse or generate EntityQL for filter: {} due to {}! Check log for detail.", filter,
// e);
// throw new BusinessException(APIFrwErrorCode.API_QUERY_INVALID_GENERIC, e);
// }
// }
//
// /**
// * @param ro
// * @return
// */
// public long createEntity(RO ro) {
// LOGGER.info("Create Entity {}.", boClass);
//
// Entity bo = null;
// String bizToken = null;
//
// DisableIdempotentCheck disableIdempotentCheck = boClass.getAnnotation(DisableIdempotentCheck.class);
// if (null == disableIdempotentCheck) {
// bizToken = RequestContextHolder.getBusinessToken();
// if (StringUtils.isNotEmpty(bizToken)) {
// if (boClass != null && NewStackBusinessObject.class.isAssignableFrom(boClass)) {
// Criteria cr = new Criteria();
// cr.where(new Equal(new Path(String.class, "businessToken"), new Constant(bizToken)));
// List<Entity> bos = boFacade.getEntityRepository(boClass).find(cr);
// if (!bos.isEmpty()) {
// bo = bos.get(0);
// }
// }
// }
// }
//
// if (null == bo) {
// prepareMapping(DozerMappingDirection.RO2Entity, null, null);
// this.validateOnCreate(ro);
// bo = boFacade.createBusinessObject(boClass);
// this.convert2Entity(ro, bo);
// if (boClass != null && NewStackBusinessObject.class.isAssignableFrom(boClass)) {
// ((NewStackBusinessObject) bo).setBusinessToken(bizToken);
// }
// bo.create();
// }
//
// return bo.getId();
// }
//
// /**
// * @param id
// * @param ro
// */
// public void updateEntity(long id, RO ro) {
// LOGGER.info("Update Entity {} id {}.", boClass, id);
//
// persistUpdates();
// prepareMapping(DozerMappingDirection.RO2Entity, null, null);
//
// Entity bo = this.getEntity(id);
//
// // check data ownership
// checkDataOwnership(bo, DosPermission.READ_WRITE);
// this.validateOnUpdate(ro, bo);
// this.convert2Entity(ro, bo);
// bo.update();
// }
//
// /**
// * @param id
// */
// public void deleteEntity(long id) {
// LOGGER.info("Delete Entity {} id {}.", boClass, id);
// Entity bo = this.getEntity(id);
//
// // check data ownership
// checkDataOwnership(bo, DosPermission.READ_WRITE);
// bo.delete();
// }
//
// /**
// * @param id
// * @return
// */
// public RO loadAndConvertRO(long id, String expand, String select) {
// prepareMapping(DozerMappingDirection.Entity2RO, expand, select);
//
// Entity bo = this.getEntity(id);
//
// long begin = System.currentTimeMillis();
// RO ro = convert2RO(bo, parseFields(expand));
//
// if (PERF_LOGGER.isInfoEnabled()) {
// String queryInfo = " expand:" + expand + " select:" + select;
// String message = MessageFormat.format(ConfigConstants.PERM_FORMAT, "", "OpenApi", queryInfo, "GET",
// "ConvertRO:1", "", String.valueOf(System.currentTimeMillis() - begin));
// PERF_LOGGER.info(message);
// }
//
// return ro;
// }
//
// private void prepareMapping(DozerMappingDirection mappingDirection, String expand, String select) {
// MappingAssistData assistData = new MappingAssistData();
//
// assistData.setMappingDirection(mappingDirection);
//
// if (mappingDirection == DozerMappingDirection.Entity2RO) {
// // select & expand processing are only meaningful for mapping from
// // Entity to RO
// if (StringUtils.isNotBlank(select) && !"*".equals(select.trim())) {
// // if select parameter is absent or "select=*", then all fields
// // need to map: don't need to set the fieldsToMap
// List<String> selectedFields = parseFields(select);
// validateFields(selectedFields, roClass);
// assistData.setFieldsToMap(selectedFields);
// }
//
// if (StringUtils.isNotBlank(expand)) {
// List<String> expandedFields = parseFields(expand);
// validateFields(expandedFields, roClass);
// assistData.setFieldsToExpand(expandedFields);
// }
// }
// MappingProcessorAssistant.setAssistData(assistData);
// }
//
// private void validateFields(List<String> fieldNames, Class<?> roClass) {
// for (String fieldName : fieldNames) {
// if (APIUtils.isUdf(fieldName)) {
// // Skip the checking of udf
// continue;
// }
// if (!APIUtils.isValidField(fieldName, roClass)) {
// throw new BusinessException(APIFrwErrorCode.API_FIELD_NOT_EXIST, fieldName);
// }
// }
// }
//
// /**
// * @param filter
// * @return
// */
// public List<RO> queryAndConvertROs(String filter, String expand, String select, String orderby, Integer limit,
// Integer offset) {
// return this.queryAndConvertROs(filter, expand, select, null, orderby, limit, offset);
// }
//
// /**
// * @param filter
// * @return
// */
// public List<RO> queryAndConvertROs(String filter, String expand, String select, String search, String orderby,
// Integer limit, Integer offset) {
// prepareMapping(DozerMappingDirection.Entity2RO, expand, select);
//
// List<RO> ros = new ArrayList<>();
// List<Entity> bos = this.queryEntitys(filter, search, orderby, limit, offset);
//
// long begin = System.currentTimeMillis();
//
// List<String> expandFields = parseFields(expand);
// for (Entity bo : bos) {
// ros.add(this.convert2RO(bo, expandFields));
// }
//
// if (PERF_LOGGER.isInfoEnabled()) {
// String queryInfo = "filter:" + filter + " expand:" + expand + " select:" + select;
// String message = MessageFormat.format(ConfigConstants.PERM_FORMAT, "", "OpenApi", queryInfo, "GET",
// "ConvertRO:" + String.valueOf(bos.size()), "", String.valueOf(System.currentTimeMillis() - begin));
// PERF_LOGGER.info(message);
// }
//
// return ros;
// }
//
// private List<String> parseFields(String select) {
// if (StringUtils.isNotBlank(select)) {
// return Arrays.asList(select.replaceAll(" ", "").split(QueryUtils.QUERY_FIELD_SEPERATOR));
// } else {
// return new ArrayList<String>();
// }
// }
//
// @Override
// public RO convert2RO(Entity bo) {
// if (bo == null) {
// return null;
// }
//
// this.preConvert2RO(bo);
// RO ro = mapper.map(bo, roClass);
// convertUDFFromEntity2RO(bo, ro, null);
// this.postConvert2RO(ro, bo);
//
// return ro;
// }
//
// /**
// * Convert a Business Object to Resource Object
// *
// * @param bo
// * @return
// */
// private RO convert2RO(Entity bo, List<String> expandFields) {
// if (bo == null) {
// return null;
// }
//
// this.preConvert2RO(bo);
// RO ro = mapper.map(bo, roClass);
// convertUDFFromEntity2RO(bo, ro, expandFields);
// this.postConvert2RO(ro, bo);
//
// return ro;
// }
//
// /**
// * Convert a Resource Object to Business Object
// *
// * @param ro
// * @param bo
// */
// protected void convert2Entity(RO ro, Entity bo) {
// if (bo == null) {
// return;
// }
//
// /**
// * Important : Disable JPA auto flush in mapping process. Otherwise
// * unnecessary changes(such as changes on associations) might be flushed
// * into DB
// */
// EntityManager entityManager = boFacade.getService(EntityManager.class);
// FlushModeType flushMode = entityManager.getFlushMode();
// entityManager.setFlushMode(FlushModeType.COMMIT);
//
// this.preConvert2Entity(ro, bo);
// mapper.map(ro, bo);
// convertUDFFromRO2Entity(ro, bo);
// this.postConvert2Entity(ro, bo);
//
// HashSet<BusinessObject> recoveringEntitys = new HashSet<>();
// this.initEntityContext(bo, new HashSet<BusinessObjectNode>(), recoveringEntitys);
// recoverAssociatedEntitys(recoveringEntitys);
//
// entityManager.setFlushMode(flushMode);
// }
//
// /**
// * Recover the associated Entitys. Associated Entitys are not allowed to change
// * while updating the main Entity. So, need to recover them to the original
// * state.
// *
// * @param recoveringEntitys
// */
// private void recoverAssociatedEntitys(HashSet<BusinessObject> recoveringEntitys) {
// EntityManager em = boFacade.getService(EntityManager.class);
// for (BusinessObject recoveringEntity : recoveringEntitys) {
// if (em.contains(recoveringEntity)) {
// UnitOfWorkImpl unitOfWork = (UnitOfWorkImpl) em.unwrap(UnitOfWork.class);
// Object originalId = APIUtils.getPropertyValue(unitOfWork.getCloneMapping().get(recoveringEntity), "id");
//
// if (!originalId.equals(recoveringEntity.getId())) {
// // If Id is changed, recover it to original value, then
// // refresh from DB;
// recoveringEntity.setPropertyValue("id", originalId);
// }
// em.refresh(recoveringEntity, APIUtils.asMap(QueryHints.REFRESH_CASCADE, CascadePolicy.NoCascading));
// }
// }
// }
//
// /**
// * Prepare Entity context : including 1. Set sub node parent to current Entity
// * (facade, meta, etc.) 2. Reload associations to prevent from updated
// *
// * @param boNode
// * @param visited
// * @param recoveringEntitys
// */
// private void initEntityContext(BusinessObjectNode boNode, Set<BusinessObjectNode> visited,
// Set<BusinessObject> recoveringEntitys) { // NOSONAR
// if (boNode == null) {
// return;
// }
//
// visited.add(boNode);
//
// // 1. init subnodes context
// initEntitySubNodesContext(boNode, visited, recoveringEntitys);
//
// // 2. Reload Entity association to prevent from modifier
// for (Association asso : boNode.getNodeType().getAssociations()) {
// // Skip for user defined association temporarily
// if (asso.isUserDefined()) {
// continue;
// }
//
// if (asso.getMultiplicity().equals("1")) {
// BusinessObject assoBo = boNode.getAssociatedBusinessObject(asso.getFullName());
//
// if (assoBo == null) {
// continue;
// }
//
// BusinessObject newAssoBo = this.reloadAssociation(assoBo, recoveringEntitys);
// if (newAssoBo == null) {
// boNode.associateBusinessObject(asso.getFullName(), null);
// } else {
// boNode.associateBusinessObject(asso.getFullName(), newAssoBo);
// if (!visited.contains(newAssoBo)) {
// // initEntityContext(newAssoBo, visited, recoveringEntitys);
// }
// }
// } else {
// @SuppressWarnings("unchecked")
// List<BusinessObject> assoBos = (List<BusinessObject>) boNode
// .getAssociatedBusinessObjects(asso.getFullName());
//
// for (ListIterator<BusinessObject> iter = assoBos.listIterator(); iter.hasNext();) {
// BusinessObject assoBo = iter.next();
//
// if (assoBo == null || visited.contains(assoBo)) {
// continue;
// }
//
// BusinessObject newAssoBo = this.reloadAssociation(assoBo, recoveringEntitys);
// if (newAssoBo == null) {
// iter.remove();
// } else {
// iter.set(newAssoBo);
// // initEntityContext(newAssoBo, visited, recoveringEntitys);
// }
// }
// }
// }
// }
//
// private void initEntitySubNodesContext(BusinessObjectNode boNode, Set<BusinessObjectNode> visited,
// Set<BusinessObject> recoveringEntitys) {
// // Set sub nodes' parent to current boNode, and initialize context
// // for each one
// for (Node node : boNode.getNodeType().getNodes()) {
// if (boNode.getNodeList(node.getName()) == null) {
// continue;
// }
//
// for (BusinessObjectNode subNode : boNode.getNodeList(node.getName())) {
// if (visited.contains(subNode)) {
// continue;
// }
//
// subNode.setParent(boNode);
//
// initEntityContext(subNode, visited, recoveringEntitys);
// }
// }
// }
//
// /**
// * @param assoBo
// * @param recoveringEntitys
// * @return
// */
// private BusinessObject reloadAssociation(BusinessObject assoBo, Set<BusinessObject> recoveringEntitys) {// NOSONAR
// if (assoBo == null) {
// return null;
// }
//
// BusinessObject newAssoBo = null;
//
// if (assoBo.getBoFacade() == null) {
// initEntityFacade(assoBo);
// }
//
// if (!assoBo.getNodeType().getBusinessKey().isEmpty()) {
// Object keyValue = assoBo.getPropertyValue(assoBo.getNodeType().getBusinessKey().get(0));
// if (keyValue != null) {
// newAssoBo = boFacade.getEntityRepository(assoBo.getClass()).loadByBusinessKey(keyValue);
// }
// }
//
// if (newAssoBo == null || newAssoBo == assoBo) {
// if (assoBo.getId() != null) {
// newAssoBo = boFacade.getEntityRepository(assoBo.getClass()).load(assoBo.getId());
// }
// }
//
// if (newAssoBo != assoBo) {
// // If the associated Entity is changed due to dozer mapping, then it
// // needs recovery
// // The recovery will execute after the main
// // conversion(initBoContext) is finished.
// recoveringEntitys.add(assoBo);
// }
// return newAssoBo;
// }
//
// /**
// * Initial Entity facade for both LiteBusinessObject and NewstackBusinessObject
// * It's a temp fix, using reflection is not 'stable', but adding
// * "initBoFacade()" into BusinessObject interface is more intrusive...
// *
// * @param bo
// */
// private void initEntityFacade(BusinessObject bo) {
// try {
// APIUtils.invokeMethod(bo, "initBoFacade", new Class[] {});
// } catch (SecurityException | IllegalArgumentException e) {
// LOGGER.info("fail to call initBoFacade(), {}", e);
// throw new BusinessException(APIFrwErrorCode.API_FAIL_TO_INIT_EntityFACADE);
// }
// }
//
// /**
// *
// */
// private void persistUpdates() {
// /**
// * Put original JSON payload into request for update
// */
// HttpServletRequest request = ApplicationContextHolder.getRequest();
// if (request != null) {
// try {
// String payload = IOUtils.readStringFromStream(request.getInputStream());
// @SuppressWarnings("unchecked")
// Map<String, Object> updates = new ObjectMapper().readValue(payload, Map.class);
// request.setAttribute(APIUtils.REQUEST_ATTRIBUTE_UPDATES, updates);
// } catch (IOException e) {
// LOGGER.warn("Caught exception.", e);
// }
// }
// }
//
// /**
// * @param ro
// * @throws BusinessException
// */
// protected void validateOnCreate(RO ro) throws BusinessException {
//
// ValidationContext.setValidationType(ValidationType.create);
// ValidationContext.setValidationTarget(ro);
//
// Set<ConstraintViolation<RO>> violations = validator.validate(ro);
// if (!violations.isEmpty()) {
// List<String> msgs = new ArrayList<>();
// for (ConstraintViolation<RO> violation : violations) {
// msgs.add(violation.getMessage());
// }
//
// // Exception message is already localized
// throw new ValidationException(APIFrwErrorCode.API_VALIDATION_COMMON, APIUtils.toString(";", msgs.toArray()),
// true);
// }
// }
//
// /**
// * @param ro
// * @param bo
// * @throws BusinessException
// */
// protected void validateOnUpdate(RO ro, Entity bo) throws BusinessException {
//
// ValidationContext.setValidationType(ValidationType.update);
// ValidationContext.setValidationTarget(ro);
//
// Set<ConstraintViolation<RO>> violations = validator.validate(ro);
// if (!violations.isEmpty()) {
// List<String> msgs = new ArrayList<>();
// for (ConstraintViolation<RO> violation : violations) {
// msgs.add(violation.getMessage());
// }
//
// // Exception message is already localized
// throw new ValidationException(APIFrwErrorCode.API_VALIDATION_COMMON, APIUtils.toString(";", msgs.toArray()),
// true);
// }
// }
//
// /**
// * @param bo
// */
// protected void preConvert2RO(Entity bo) {
//
// }
//
// /**
// * @param ro
// * @param bo
// */
// protected void postConvert2RO(RO ro, Entity bo) {
//
// }
//
// /**
// * @param ro
// */
// protected void preConvert2Entity(RO ro, Entity bo) {
//
// }
//
// /**
// * @param ro
// * @param bo
// */
// protected void postConvert2Entity(RO ro, Entity bo) {
//
// }
//
// public Map<String, Object> getCustomFieldsMeta() {
// Map<String, Object> meta = new LinkedHashMap<>();
// BusinessObjectType boType = boFacade.getMetadataRepository().getBusinessObjectType(boClass);
// if (boType != null) {
// NodeType nodeType = boType.getRootNode();
// meta.put(KEY_CUSTOM_FIELDS, getNodeTypeCustomFields(nodeType));
// for (Node node : nodeType.getNodes()) {
// FieldMap fieldMap = bo2roClassMap.getFieldMapUsingSrc(node.getName());
// if (fieldMap != null) {
// Map<String, Object> nodeMeta = new LinkedHashMap<>();
// nodeMeta.put(KEY_CUSTOM_FIELDS, getNodeTypeCustomFields(node.getNodeType()));
// meta.put(fieldMap.getDestFieldName(), nodeMeta);
// }
// }
// }
// return meta;
// }
//
// private List<FieldMeta> getNodeTypeCustomFields(NodeType nodeType) {
// List<FieldMeta> udfs = new LinkedList<>();
// for (Property prop : nodeType.getUserFieldsMeta()) {
// UserProperty udf = (UserProperty) prop;
// // only return default namespace udf, and ignore linked type udf
// if (NameUtils.CUST_Entity_NAMESPACE.equals(prop.getNamespace()) && !udf.isLinkedType()) {
// FieldMeta fieldMeta = new FieldMeta();
// fieldMeta.setFieldName(udf.getFullApiName());
// fieldMeta.setFieldLabel(prop.getLabel());
// fieldMeta.setFieldType(prop.getType());
// udfs.add(fieldMeta);
// }
// }
// return udfs;
// }
//
// @SuppressWarnings({ "rawtypes" })
// private void convert2RONode(BusinessObjectNode boNode, Object ro, String subNodeName) {
// FieldMap fieldMap = bo2roClassMap.getFieldMapUsingSrc(subNodeName);
// if (fieldMap != null) {
// Object nodeListObj = fieldMap.getDestValue(ro);
// if (nodeListObj instanceof List) {
// List nodeList = (List) nodeListObj;
// List<? extends BusinessObjectNode> boNodeList = boNode.getNodeList(subNodeName);
// for (int i = 0; i < boNodeList.size(); i++) {
// // AWB-45405 filter not extend object sub node
// if (!(nodeList.get(i) instanceof ExtendObject)) {
// break;
// }
// setNodeUDFForRO(boNodeList.get(i), nodeList.get(i));
// }
// }
// }
// }
//
// @SuppressWarnings("rawtypes")
// private void convert2EntityNode(Object ro, BusinessObjectNode boNode, String subNodeName) {
// FieldMap fieldMap = ro2boClassMap.getFieldMapUsingDest(subNodeName);
// if (fieldMap != null) {
// Object nodeListObj = fieldMap.getSrcFieldValue(ro);
// if (nodeListObj instanceof List) {
// List nodeList = (List) nodeListObj;
// List<? extends BusinessObjectNode> boNodeList = boNode.getNodeList(subNodeName);
// for (int i = 0; i < boNodeList.size(); i++) {
// convertUDFFromRO2Entity(nodeList.get(i), boNodeList.get(i));
// }
// }
// }
// }
//
// }
