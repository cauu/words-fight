<template>
  <div>
    <section class="content-head-wrapper">
      <Row>
        <Col span="22">
          <Breadcrumb>
            <Breadcrumb-item href="/book/list">
              书本
            </Breadcrumb-item>
            <Breadcrumb-item href="/level/list">
              关卡
            </Breadcrumb-item>
            <Breadcrumb-item>
              问题
            </Breadcrumb-item>
            <Breadcrumb-item>
              编辑问题
            </Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
    </section>

    <section className="content-main-wrapper">
      <Form
        :label-width="60">
        <Form-item
          label="名称"
          >
          <Row>
            <Col span="8">
              <Input placeholder="请输入问题名称" />
            </Col>
          </Row>
        </Form-item>
      </Form>
    </section>
  </div>
</template>