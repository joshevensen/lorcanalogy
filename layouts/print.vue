<template>
  <LayoutHeader class="print:hidden!"/>
  <PageHeader class="mt-24 print:hidden"/>

  <slot/>

  <LayoutFooter class="print:hidden!"/>
</template>

<style>
@page {
  size: auto;
  margin: 0;
}
</style>
