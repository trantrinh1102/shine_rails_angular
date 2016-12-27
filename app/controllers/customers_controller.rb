class CustomersController < ApplicationController
  PAGE_SIZE = 5

  def index
    @page = (params[:page] || 0).to_i
    if params[:keywords].present?
      @keywords = params[:keywords]
      customers_search_term = CustomerSearchTerm.new(@keywords)
      @customers = Customer.where(
        customers_search_term.where_clause,
        customers_search_term.where_args).
        order(customers_search_term.order).
        offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
    else
      @customers = Customer.all.limit(5)
    end
  end
end
